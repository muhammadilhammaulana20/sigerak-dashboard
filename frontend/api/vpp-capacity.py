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
    v2g_evs = [e for e in ev_data if e.get("v2g_status") == "Full V2G"]
    total_kwh = sum(e.get("battery_capacity", 0) for e in v2g_evs)
    total_ev = len(v2g_evs)
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "total_kwh": round(total_kwh, 1),
            "total_ev": total_ev,
            "avg_per_ev": round(total_kwh / max(total_ev, 1), 1),
        })
    }
