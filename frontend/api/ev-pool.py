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
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"data": ev_data, "total": len(ev_data)})
    }
