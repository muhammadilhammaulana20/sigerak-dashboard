import json
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'backend', 'data')

def _load_json(filename):
    path = os.path.join(DATA_DIR, filename)
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return []

def handler(request):
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

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "total_ev": total_ev,
            "v2g_full": v2g_full,
            "total_vpp_kwh": round(total_vpp_kwh, 1),
            "total_grading": total_grading,
            "grade_a": grade_a,
            "grade_b": grade_b,
            "grade_c": grade_c,
            "avg_soh": avg_soh,
        })
    }
