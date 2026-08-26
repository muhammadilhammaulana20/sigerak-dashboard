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
    history = _load_json("dispatch_history.json")
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"data": history, "total": len(history)})
    }
