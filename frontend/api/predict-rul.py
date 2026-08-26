import json
import os
import numpy as np

ML_DIR = os.path.join(os.path.dirname(__file__), '..', 'backend', 'ml')

def handler(request):
    if request.method != 'POST':
        return {"statusCode": 405, "body": json.dumps({"error": "Method not allowed"})}

    try:
        body = json.loads(request.body)
    except:
        return {"statusCode": 400, "body": json.dumps({"error": "Invalid JSON"})}

    soh = body.get("soh", 80)
    cycle_count = body.get("cycle_count", 0)

    model_path = os.path.join(ML_DIR, "rul_model.pkl")
    if os.path.exists(model_path):
        import joblib
        model = joblib.load(model_path)
        features = np.array([[soh, cycle_count, body.get("voltage", 3.7), body.get("temperature", 25)]])
        rul_pred = model.predict(features)[0]
        rul_days = max(0, int(rul_pred))
        model_used = "ml"
    else:
        rul_days = max(0, int((soh - 40) * 10 - cycle_count * 0.5))
        model_used = "heuristic"

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "rul_days": rul_days,
            "rul_cycles": max(0, int(rul_days / 2)),
            "model_used": model_used
        })
    }
