import os
import joblib
import numpy as np
from flask import Blueprint, jsonify, request

ml_api = Blueprint("ml_api", __name__, url_prefix="/api/ml")

ML_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "ml")


def _load_model(name):
    path = os.path.join(ML_DIR, f"{name}.pkl")
    if os.path.exists(path):
        return joblib.load(path)
    return None


@ml_api.route("/predict/soh", methods=["POST"])
def predict_soh():
    body = request.get_json()
    if not body:
        return jsonify({"error": "No data provided"}), 400

    required = ["voltage", "current", "temperature", "capacity", "cycle_count"]
    for field in required:
        if field not in body:
            return jsonify({"error": f"Missing field: {field}"}), 400

    features = np.array([[
        body["voltage"],
        body["current"],
        body["temperature"],
        body["capacity"],
        body["cycle_count"],
    ]])

    model = _load_model("soh_model")
    if model is None:
        soh = max(40, min(100, 100 - (body["cycle_count"] * 0.05) - (body["temperature"] * 0.1)))
        return jsonify({
            "soh": round(soh, 1),
            "grade": "A" if soh >= 80 else "B" if soh >= 60 else "C",
            "model_used": "heuristic",
        })

    soh_pred = model.predict(features)[0]
    soh = round(float(soh_pred), 1)
    grade = "A" if soh >= 80 else "B" if soh >= 60 else "C"

    return jsonify({
        "soh": soh,
        "grade": grade,
        "model_used": "ml",
    })


@ml_api.route("/predict/rul", methods=["POST"])
def predict_rul():
    body = request.get_json()
    if not body:
        return jsonify({"error": "No data provided"}), 400

    soh = body.get("soh", 80)
    cycle_count = body.get("cycle_count", 0)

    model = _load_model("rul_model")
    if model is None:
        rul = max(0, int((soh - 40) * 10 - cycle_count * 0.5))
        return jsonify({
            "rul_days": rul,
            "rul_cycles": max(0, int(rul / 2)),
            "model_used": "heuristic",
        })

    features = np.array([[soh, cycle_count, body.get("voltage", 3.7), body.get("temperature", 25)]])
    rul_pred = model.predict(features)[0]

    return jsonify({
        "rul_days": max(0, int(rul_pred)),
        "rul_cycles": max(0, int(rul_pred / 2)),
        "model_used": "ml",
    })


@ml_api.route("/predict/mobility-risk", methods=["POST"])
def predict_mobility_risk():
    body = request.get_json()
    if not body:
        return jsonify({"error": "No data provided"}), 400

    departure_hour = body.get("departure_hour", 8)
    parking_duration = body.get("parking_duration", 4)
    soc = body.get("soc", 80)
    consistency = body.get("consistency", 0.7)

    risk_score = (1 - consistency) * 40 + (100 - soc) * 0.3 + max(0, 8 - parking_duration) * 5

    if risk_score < 30:
        status = "Full V2G"
    elif risk_score < 60:
        status = "Limited V2G"
    else:
        status = "Protected"

    return jsonify({
        "risk_score": round(risk_score, 1),
        "status": status,
        "soc": soc,
        "parking_duration": parking_duration,
    })


@ml_api.route("/health")
def ml_health():
    soh_exists = os.path.exists(os.path.join(ML_DIR, "soh_model.pkl"))
    rul_exists = os.path.exists(os.path.join(ML_DIR, "rul_model.pkl"))
    return jsonify({
        "status": "ok",
        "soh_model": "trained" if soh_exists else "not_trained",
        "rul_model": "trained" if rul_exists else "not_trained",
    })
