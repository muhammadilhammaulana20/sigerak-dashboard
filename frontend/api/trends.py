import json

def handler(request):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
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
    }
