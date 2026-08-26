"""
SIGERAK ML Training Script
Generates synthetic training data and trains SoH + RUL prediction models.
Run: python ml/train.py
"""
import os
import numpy as np
import joblib
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

ML_DIR = os.path.dirname(os.path.abspath(__file__))


def generate_battery_data(n_samples=500):
    np.random.seed(42)
    cycle_counts = np.random.randint(50, 1500, n_samples)
    voltages = 3.2 + np.random.uniform(0, 0.6, n_samples)
    currents = 20 + np.random.uniform(0, 40, n_samples)
    temperatures = 25 + np.random.uniform(0, 25, n_samples)
    capacities = 20 + np.random.uniform(0, 55, n_samples)

    soh = 100 - (cycle_counts * 0.04) - (temperatures * 0.15) + np.random.normal(0, 2, n_samples)
    soh = np.clip(soh, 30, 100)

    rul = np.maximum(0, (soh - 40) * 8 - cycle_counts * 0.3 + np.random.normal(0, 20, n_samples))

    X = np.column_stack([voltages, currents, temperatures, capacities, cycle_counts])
    return X, soh, rul


def train_soh_model():
    print("Training SoH prediction model...")
    X, soh, _ = generate_battery_data(500)
    X_train, X_test, y_train, y_test = train_test_split(X, soh, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f"  SoH Model — MAE: {mae:.2f}%, R2: {r2:.4f}")

    joblib.dump(model, os.path.join(ML_DIR, "soh_model.pkl"))
    print("  Saved: soh_model.pkl")
    return model


def train_rul_model():
    print("Training RUL prediction model...")
    X_full, soh, rul = generate_battery_data(500)
    X = np.column_stack([soh, X_full[:, 2], X_full[:, 0], X_full[:, 1]])
    X_train, X_test, y_train, y_test = train_test_split(X, rul, test_size=0.2, random_state=42)

    model = GradientBoostingRegressor(n_estimators=100, max_depth=5, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f"  RUL Model — MAE: {mae:.2f} days, R2: {r2:.4f}")

    joblib.dump(model, os.path.join(ML_DIR, "rul_model.pkl"))
    print("  Saved: rul_model.pkl")
    return model


if __name__ == "__main__":
    print("=" * 50)
    print("  SIGERAK ML Model Training")
    print("=" * 50)
    train_soh_model()
    train_rul_model()
    print("=" * 50)
    print("  Training complete!")
    print("=" * 50)
