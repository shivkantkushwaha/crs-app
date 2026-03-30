"""
train.py — Train and save the Crop Recommendation Model

Run this once before starting the server:
    python train.py

This trains the exact same RandomForestClassifier used in the notebook
(same dataset, same split, same random_state=42) to preserve 99.32% accuracy.
"""

import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import os
import sys

CSV_PATH = "Crop_Recommendation.csv"
MODEL_PATH = "crop_model.pkl"

def train():
    if not os.path.exists(CSV_PATH):
        print(f"ERROR: '{CSV_PATH}' not found.")
        print("Place your Crop_Recommendation.csv in the same folder as this script.")
        sys.exit(1)

    print("Loading dataset...")
    data = pd.read_csv(CSV_PATH)
    print(f"Dataset shape: {data.shape}")
    print(f"Columns: {list(data.columns)}")
    print(f"Crops: {sorted(data['Crop'].unique())}")
    print(f"Missing values:\n{data.isnull().sum()}")

    X = data.drop("Crop", axis=1)
    y = data["Crop"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    print(f"\nTraining samples: {len(X_train)} | Test samples: {len(X_test)}")

    print("\nTraining RandomForestClassifier...")
    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {accuracy:.4f} ({accuracy * 100:.2f}%)")

    pickle.dump(model, open(MODEL_PATH, "wb"))
    print(f"\nModel saved to '{MODEL_PATH}'")
    print("You can now start the server: uvicorn main:app --reload")

if __name__ == "__main__":
    train()
