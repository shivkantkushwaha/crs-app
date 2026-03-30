# CRS-Server — Crop Recommendation System Backend

FastAPI Python backend for CRSAPP. Uses a **RandomForestClassifier** trained on
`Crop_Recommendation.csv` achieving **99.32% accuracy** (same as notebook).

## Project Structure

```
crs-server/
├── main.py                  ← FastAPI app (start this)
├── train.py                 ← Train and save model (run once)
├── requirements.txt
├── .env.example             ← Copy to .env and fill in keys
└── Crop_Recommendation.csv  ← Your dataset (place here)
```

## Quick Start

### 1. Install dependencies
```bash
pip install -r requirements.txt
```

### 2. Set up environment
```bash
cp .env.example .env
# Edit .env and add your OPENWEATHER_API_KEY
```

### 3. Place your dataset
Copy `Crop_Recommendation.csv` into this folder.

### 4. Train the model (run once)
```bash
python train.py
```
This creates `crop_model.pkl`. You will see the accuracy printed.

### 5. Start the server
```bash
uvicorn main:app --reload --port 8000
```

Server runs at: `http://localhost:8000`

---

## API Endpoints

### GET `/health`
Returns server status and supported crops.

### POST `/predict`
**Request body (JSON):**
```json
{
  "nitrogen": 90,
  "phosphorus": 42,
  "potassium": 43,
  "temperature": 20.8,
  "humidity": 82,
  "ph": 6.5,
  "rainfall": 202.9
}
```
OR pass a city name instead of rainfall:
```json
{
  "nitrogen": 90,
  "phosphorus": 42,
  "potassium": 43,
  "temperature": 20.8,
  "humidity": 82,
  "ph": 6.5,
  "city": "Delhi"
}
```

**Response:**
```json
{
  "crop": "Rice",
  "confidence": 0.97,
  "rainfall_used": 202.9,
  "top_3": [
    { "crop": "Rice", "confidence": 0.97 },
    { "crop": "Maize", "confidence": 0.02 },
    { "crop": "Jute", "confidence": 0.01 }
  ]
}
```

---

## Connecting to Next.js Frontend

In your `crs-client/.env.local`, set:
```
PYTHON_API_URL=http://localhost:8000
```

The Next.js `/api/predict` route already proxies to this URL — no other changes needed.

---

## OpenWeatherMap API Key (Free)

1. Register at https://openweathermap.org/api
2. Go to API Keys section → copy your default key
3. Add to `.env` as `OPENWEATHER_API_KEY=your_key`
4. Free tier gives 1,000 calls/day — more than enough

---

## Deploying to Production

You can deploy this to any Python host:
- **Railway** — `railway up`
- **Render** — connect GitHub repo, set env vars in dashboard
- **Fly.io** — `fly deploy`
- **VPS** — run with `uvicorn main:app --host 0.0.0.0 --port 8000`

After deploying, set in `crs-client/.env.local`:
```
PYTHON_API_URL=https://your-crs-server-domain.com
```
