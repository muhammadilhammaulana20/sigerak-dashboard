from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import numpy as np

app = Flask(__name__)
CORS(app)

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'backend', 'data')
ML_DIR = os.path.join(os.path.dirname(__file__), '..', 'backend', 'ml')

def _load_json(filename):
    path = os.path.join(DATA_DIR, filename)
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return []

@app.route('/api/health')
def health():
    return jsonify({"status": "ok", "app": "SIGERAK", "version": "1.0.0"})

@app.route('/api/summary')
def get_summary():
    ev_data = _load_json("ev_pool.json")
    grading_data = _load_json("grading_history.json")
    total_ev = len(ev_data)
    v2g_full = sum(1 for e in ev_data if e.get("v2g_status") == "Full V2G")
    total_vpp_kwh = sum(e.get("battery_capacity", 0) for e in ev_data if e.get("v2g_status") == "Full V2G")
    total_grading = len(grading_data)
    grade_a = sum(1 for g in grading_data if g.get("grade") == "A")
    grade_b = sum(1 for g in grading_data if g.get("grade") == "B")
    grade_c = sum(1 for g in grading_data if g.get("grade") == "C")
    avg_soh = round(sum(g.get("soh", 0) for g in grading_data) / max(total_grading, 1), 1)
    return jsonify({
        "total_ev": total_ev, "v2g_full": v2g_full, "total_vpp_kwh": round(total_vpp_kwh, 1),
        "total_grading": total_grading, "grade_a": grade_a, "grade_b": grade_b,
        "grade_c": grade_c, "avg_soh": avg_soh,
    })

@app.route('/api/v2g/ev-pool')
def get_ev_pool():
    ev_data = _load_json("ev_pool.json")
    return jsonify({"data": ev_data, "total": len(ev_data)})

@app.route('/api/v2g/vpp-capacity')
def get_vpp_capacity():
    ev_data = _load_json("ev_pool.json")
    v2g_evs = [e for e in ev_data if e.get("v2g_status") == "Full V2G"]
    total_kwh = sum(e.get("battery_capacity", 0) for e in v2g_evs)
    total_ev = len(v2g_evs)
    return jsonify({
        "total_kwh": round(total_kwh, 1), "total_ev": total_ev,
        "avg_per_ev": round(total_kwh / max(total_ev, 1), 1),
    })

@app.route('/api/v2g/dispatch-history')
def get_dispatch_history():
    history = _load_json("dispatch_history.json")
    return jsonify({"data": history, "total": len(history)})

@app.route('/api/grading/history')
def get_grading_history():
    history = _load_json("grading_history.json")
    return jsonify({"data": history, "total": len(history)})

@app.route('/api/grading/distribution')
def get_grading_distribution():
    history = _load_json("grading_history.json")
    dist = {"A": 0, "B": 0, "C": 0}
    for g in history:
        grade = g.get("grade", "C")
        dist[grade] = dist.get(grade, 0) + 1
    return jsonify([
        {"grade": "A", "label": "BESS Rumah Tangga", "jumlah": dist["A"], "color": "#43A047"},
        {"grade": "B", "label": "Cadangan Skala Kecil", "jumlah": dist["B"], "color": "#FB8C00"},
        {"grade": "C", "label": "Daur Ulang", "jumlah": dist["C"], "color": "#E53935"},
    ])

@app.route('/api/analysis/trends')
def get_trends():
    return jsonify({
        "soh_trend": [
            {"bulan": "Jan", "avg_soh": 92.1}, {"bulan": "Feb", "avg_soh": 91.5},
            {"bulan": "Mar", "avg_soh": 90.8}, {"bulan": "Apr", "avg_soh": 90.2},
            {"bulan": "Mei", "avg_soh": 89.6}, {"bulan": "Jun", "avg_soh": 88.9},
            {"bulan": "Jul", "avg_soh": 88.3}, {"bulan": "Agu", "avg_soh": 87.7},
        ],
        "vpp_contribution": [
            {"bulan": "Jan", "kwh": 1250}, {"bulan": "Feb", "kwh": 1380},
            {"bulan": "Mar", "kwh": 1520}, {"bulan": "Apr", "kwh": 1690},
            {"bulan": "Mei", "kwh": 1850}, {"bulan": "Jun", "kwh": 2010},
            {"bulan": "Jul", "kwh": 2180}, {"bulan": "Agu", "kwh": 2340},
        ],
    })

@app.route('/api/data/sources')
def get_data_sources():
    return jsonify([
        {"nama": "NASA Prognostics Center of Excellence (PCoE)", "deskripsi": "Dataset siklus baterai lithium-ion", "sumber": "NASA", "url": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/", "tahun": "2024"},
        {"nama": "CALCE Battery Data", "deskripsi": "Center for Advanced Life Cycle Engineering, University of Maryland", "sumber": "University of Maryland", "url": "https://calce.umd.edu/battery-data", "tahun": "2024"},
        {"nama": "Kementerian Perindustrian RI", "deskripsi": "Data pertumbuhan populasi EV Indonesia", "sumber": "Kemenperin", "url": "https://www.kemenperin.go.id", "tahun": "2025-2026"},
        {"nama": "Kementerian ESDM RI", "deskripsi": "Data populasi kendaraan listrik dan infrastruktur pengisian", "sumber": "ESDM", "url": "https://www.esdm.go.id", "tahun": "2025-2026"},
    ])

@app.route('/api/ml/predict/soh', methods=['POST'])
def predict_soh():
    body = request.get_json()
    if not body:
        return jsonify({"error": "No data provided"}), 400
    required = ["voltage", "current", "temperature", "capacity", "cycle_count"]
    for field in required:
        if field not in body:
            return jsonify({"error": f"Missing field: {field}"}), 400
    features = np.array([[body["voltage"], body["current"], body["temperature"], body["capacity"], body["cycle_count"]]])
    model_path = os.path.join(ML_DIR, "soh_model.pkl")
    if os.path.exists(model_path):
        import joblib
        model = joblib.load(model_path)
        soh = round(float(model.predict(features)[0]), 1)
        model_used = "ml"
    else:
        soh = round(max(40, min(100, 100 - (body["cycle_count"] * 0.05) - (body["temperature"] * 0.1))), 1)
        model_used = "heuristic"
    grade = "A" if soh >= 80 else "B" if soh >= 60 else "C"
    return jsonify({"soh": soh, "grade": grade, "model_used": model_used})

@app.route('/api/ml/predict/rul', methods=['POST'])
def predict_rul():
    body = request.get_json()
    if not body:
        return jsonify({"error": "No data provided"}), 400
    soh = body.get("soh", 80)
    cycle_count = body.get("cycle_count", 0)
    model_path = os.path.join(ML_DIR, "rul_model.pkl")
    if os.path.exists(model_path):
        import joblib
        model = joblib.load(model_path)
        features = np.array([[soh, cycle_count, body.get("voltage", 3.7), body.get("temperature", 25)]])
        rul_days = max(0, int(model.predict(features)[0]))
        model_used = "ml"
    else:
        rul_days = max(0, int((soh - 40) * 10 - cycle_count * 0.5))
        model_used = "heuristic"
    return jsonify({"rul_days": rul_days, "rul_cycles": max(0, int(rul_days / 2)), "model_used": model_used})

@app.route('/api/ml/predict/mobility-risk', methods=['POST'])
def predict_mobility_risk():
    body = request.get_json()
    if not body:
        return jsonify({"error": "No data provided"}), 400
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
    return jsonify({"risk_score": round(risk_score, 1), "status": status, "soc": soc, "parking_duration": parking_duration})
