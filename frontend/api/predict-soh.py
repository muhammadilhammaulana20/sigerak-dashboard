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

    required = ["voltage", "current", "temperature", "capacity", "cycle_count"]
    for field in required:
        if field not in body:
            return {"statusCode": 400, "body": json.dumps({"error": f"Missing field: {field}"})}

    features = np.array([[
        body["voltage"],
        body["current"],
        body["temperature"],
        body["capacity"],
        body["cycle_count"],
    ]])

    model_path = os.path.join(ML_DIR, "soh_model.pkl")
    if os.path.exists(model_path):
        import joblib
        model = joblib.load(model_path)
        soh_pred = model.predict(features)[0]
        soh = round(float(soh_pred), 1)
        model_used = "ml"
    else:
        soh = max(40, min(100, 100 - (body["cycle_count"] * 0.05) - (body["temperature"] * 0.1)))
        soh = round(soh, 1)
        model_used = "heuristic"

    grade = "A" if soh >= 80 else "B" if soh >= 60 else "C"

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"soh": soh, "grade": grade, "model_used": model_used})
    }
