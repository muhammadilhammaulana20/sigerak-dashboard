import json
import os
from flask import Blueprint, jsonify, request

api = Blueprint("api", __name__, url_prefix="/api")

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")


def _load_json(filename):
    path = os.path.join(DATA_DIR, filename)
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return []


@api.route("/health")
def health():
    return jsonify({"status": "ok", "app": "SIGERAK", "version": "1.0.0"})


@api.route("/summary")
def get_summary():
    ev_data = _load_json("ev_pool.json")
    grading_data = _load_json("grading_history.json")

    total_ev = len(ev_data)
    v2g_full = sum(1 for e in ev_data if e.get("v2g_status") == "Full V2G")
    v2g_limited = sum(1 for e in ev_data if e.get("v2g_status") == "Limited V2G")
    v2g_protected = sum(1 for e in ev_data if e.get("v2g_status") == "Protected")

    total_vpp_kwh = sum(e.get("battery_capacity", 0) for e in ev_data if e.get("v2g_status") == "Full V2G")
    total_grading = len(grading_data)
    grade_a = sum(1 for g in grading_data if g.get("grade") == "A")
    grade_b = sum(1 for g in grading_data if g.get("grade") == "B")
    grade_c = sum(1 for g in grading_data if g.get("grade") == "C")

    avg_soh = round(sum(g.get("soh", 0) for g in grading_data) / max(total_grading, 1), 1)

    return jsonify({
        "total_ev": total_ev,
        "v2g_full": v2g_full,
        "v2g_limited": v2g_limited,
        "v2g_protected": v2g_protected,
        "total_vpp_kwh": round(total_vpp_kwh, 1),
        "total_grading": total_grading,
        "grade_a": grade_a,
        "grade_b": grade_b,
        "grade_c": grade_c,
        "avg_soh": avg_soh,
    })


@api.route("/v2g/ev-pool")
def get_ev_pool():
    ev_data = _load_json("ev_pool.json")
    status = request.args.get("status")
    if status:
        ev_data = [e for e in ev_data if e.get("v2g_status") == status]
    return jsonify({"data": ev_data, "total": len(ev_data)})


@api.route("/v2g/vpp-capacity")
def get_vpp_capacity():
    ev_data = _load_json("ev_pool.json")
    v2g_evs = [e for e in ev_data if e.get("v2g_status") == "Full V2G"]
    total_kwh = sum(e.get("battery_capacity", 0) for e in v2g_evs)
    total_ev = len(v2g_evs)
    return jsonify({
        "total_kwh": round(total_kwh, 1),
        "total_ev": total_ev,
        "avg_per_ev": round(total_kwh / max(total_ev, 1), 1),
    })


@api.route("/v2g/dispatch-history")
def get_dispatch_history():
    history = _load_json("dispatch_history.json")
    return jsonify({"data": history, "total": len(history)})


@api.route("/grading/history")
def get_grading_history():
    history = _load_json("grading_history.json")
    return jsonify({"data": history, "total": len(history)})


@api.route("/grading/distribution")
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


@api.route("/analysis/trends")
def get_trends():
    return jsonify({
        "soh_trend": [
            {"bulan": "Jan", "avg_soh": 92.1},
            {"bulan": "Feb", "avg_soh": 91.5},
            {"bulan": "Mar", "avg_soh": 90.8},
            {"bulan": "Apr", "avg_soh": 90.2},
            {"bulan": "Mei", "avg_soh": 89.6},
            {"bulan": "Jun", "avg_soh": 88.9},
            {"bulan": "Jul", "avg_soh": 88.3},
            {"bulan": "Agu", "avg_soh": 87.7},
        ],
        "vpp_contribution": [
            {"bulan": "Jan", "kwh": 1250},
            {"bulan": "Feb", "kwh": 1380},
            {"bulan": "Mar", "kwh": 1520},
            {"bulan": "Apr", "kwh": 1690},
            {"bulan": "Mei", "kwh": 1850},
            {"bulan": "Jun", "kwh": 2010},
            {"bulan": "Jul", "kwh": 2180},
            {"bulan": "Agu", "kwh": 2340},
        ],
    })


@api.route("/data/sources")
def get_data_sources():
    return jsonify([
        {
            "nama": "NASA Prognostics Center of Excellence (PCoE)",
            "deskripsi": "Dataset siklus baterai lithium-ion untuk prediksi SoH dan RUL",
            "sumber": "NASA",
            "url": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
            "tahun": "2024",
        },
        {
            "nama": "CALCE Battery Data",
            "deskripsi": "Center for Advanced Life Cycle Engineering, University of Maryland",
            "sumber": "University of Maryland",
            "url": "https://calce.umd.edu/battery-data",
            "tahun": "2024",
        },
        {
            "nama": "Kementerian Perindustrian RI",
            "deskripsi": "Data pertumbuhan populasi EV Indonesia",
            "sumber": "Kemenperin",
            "url": "https://www.kemenperin.go.id",
            "tahun": "2025-2026",
        },
        {
            "nama": "Kementerian ESDM RI",
            "deskripsi": "Data populasi kendaraan listrik dan infrastruktur pengisian",
            "sumber": "ESDM",
            "url": "https://www.esdm.go.id",
            "tahun": "2025-2026",
        },
    ])
