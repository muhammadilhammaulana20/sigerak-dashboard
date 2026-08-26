import json

def handler(request):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"status": "ok", "app": "SIGERAK", "version": "1.0.0"})
    }
