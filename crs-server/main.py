"""
main.py — CRS-Server: Crop Recommendation System API
"""

import os
import pickle
import requests
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="CRS-Server",
    description="Crop Recommendation System — Python ML Backend",
    version="1.0.0",
)

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

MODEL_PATH = os.getenv("MODEL_PATH", "crop_model.pkl")

if not os.path.exists(MODEL_PATH):
    raise RuntimeError(
        f"Model file '{MODEL_PATH}' not found.\n"
        "Run: python train.py\n"
        "to train and save the model before starting the server."
    )

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

FEATURE_COLUMNS = [
    "Nitrogen",
    "Phosphorus",
    "Potassium",
    "Temperature",
    "Humidity",
    "pH_Value",
    "Rainfall",
]

print(f"Model loaded from '{MODEL_PATH}'")
print(f"Crops supported: {sorted(model.classes_)}")


class PredictRequest(BaseModel):
    N: float = Field(..., ge=0, description="Nitrogen (mg/kg)")
    P: float = Field(..., ge=0, description="Phosphorus (mg/kg)")
    K: float = Field(..., ge=0, description="Potassium (mg/kg)")
    temperature: float = Field(..., description="Temperature (°C)")
    humidity: float = Field(..., ge=0, le=100, description="Humidity (%)")
    ph: float = Field(..., ge=0, le=14, description="Soil pH")
    rainfall: float = Field(None, ge=0, description="Rainfall (mm)")
    city: str = Field(None, description="City for auto rainfall fetch")


class PredictResponse(BaseModel):
    crop: str
    confidence: float
    rainfall_used: float
    top_3: list[dict]


def fetch_rainfall(city: str) -> float:
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="OPENWEATHER_API_KEY is not set. Add it to .env or provide 'rainfall' directly."
        )

    url = (
        f"http://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={api_key}&units=metric"
    )

    try:
        resp = requests.get(url, timeout=8)
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail=f"Weather API timed out for city '{city}'")
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=502, detail="Could not reach the weather API")

    if resp.status_code == 404:
        raise HTTPException(status_code=400, detail=f"City '{city}' not found on OpenWeatherMap")
    if resp.status_code == 401:
        raise HTTPException(status_code=500, detail="Invalid OPENWEATHER_API_KEY")
    if resp.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail=f"Weather API error {resp.status_code}: {resp.json().get('message', 'unknown')}"
        )

    data = resp.json()
    rain_mm = data.get("rain", {}).get("1h", 0.0)
    return float(rain_mm)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "model": "RandomForestClassifier",
        "accuracy": "99.32%",
        "features": FEATURE_COLUMNS,
        "crops_supported": sorted(model.classes_.tolist()),
    }


@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    if req.rainfall is not None:
        rainfall = float(req.rainfall)
    elif req.city:
        rainfall = fetch_rainfall(req.city)
    else:
        raise HTTPException(
            status_code=422,
            detail="Provide either 'rainfall' (numeric, mm) or 'city' (to auto-fetch rainfall)."
        )

    input_df = pd.DataFrame(
        [[req.N, req.P, req.K,
          req.temperature, req.humidity, req.ph, rainfall]],
        columns=FEATURE_COLUMNS,
    )

    predicted_crop = model.predict(input_df)[0]
    probabilities = model.predict_proba(input_df)[0]
    classes = model.classes_

    class_probs = sorted(
        zip(classes, probabilities), key=lambda x: x[1], reverse=True
    )
    top_3 = [
        {"crop": crop, "confidence": round(float(prob), 4)}
        for crop, prob in class_probs[:3]
    ]

    confidence = round(float(max(probabilities)), 4)

    return PredictResponse(
        crop=predicted_crop,
        confidence=confidence,
        rainfall_used=round(rainfall, 2),
        top_3=top_3,
    )




#run the server - python -m uvicorn main:app --reload --port 8000
#install all requirement - pip install -r requirements.txt
