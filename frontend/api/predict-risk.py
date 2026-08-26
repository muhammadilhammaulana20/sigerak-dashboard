import json

def handler(request):
    if request.method != 'POST':
        return {"statusCode": 405, "body": json.dumps({"error": "Method not allowed"})}

    try:
        body = json.loads(request.body)
    except:
        return {"statusCode": 400, "body": json.dumps({"error": "Invalid JSON"})}

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

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "risk_score": round(risk_score, 1),
            "status": status,
            "soc": soc,
            "parking_duration": parking_duration,
        })
    }
