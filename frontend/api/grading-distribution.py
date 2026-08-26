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
    history = _load_json("grading_history.json")
    dist = {"A": 0, "B": 0, "C": 0}
    for g in history:
        grade = g.get("grade", "C")
        dist[grade] = dist.get(grade, 0) + 1
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps([
            {"grade": "A", "label": "BESS Rumah Tangga", "jumlah": dist["A"], "color": "#43A047"},
            {"grade": "B", "label": "Cadangan Skala Kecil", "jumlah": dist["B"], "color": "#FB8C00"},
            {"grade": "C", "label": "Daur Ulang", "jumlah": dist["C"], "color": "#E53935"},
        ])
    }
