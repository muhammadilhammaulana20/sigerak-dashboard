import json

def handler(request):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps([
            {
                "nama": "NASA Prognostics Center of Excellence (PCoE)",
                "deskripsi": "Dataset siklus baterai lithium-ion untuk prediksi SoH dan RUL",
                "sumber": "NASA",
                "url": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
                "tahun": "2024",
            },
            {
                "nama": "CALCE Battery Data",
                "deskripsi": "Center for Advanced Life Cycle Engineering, University of Maryland",
                "sumber": "University of Maryland",
                "url": "https://calce.umd.edu/battery-data",
                "tahun": "2024",
            },
            {
                "nama": "Kementerian Perindustrian RI",
                "deskripsi": "Data pertumbuhan populasi EV Indonesia",
                "sumber": "Kemenperin",
                "url": "https://www.kemenperin.go.id",
                "tahun": "2025-2026",
            },
            {
                "nama": "Kementerian ESDM RI",
                "deskripsi": "Data populasi kendaraan listrik dan infrastruktur pengisian",
                "sumber": "ESDM",
                "url": "https://www.esdm.go.id",
                "tahun": "2025-2026",
            },
        ])
    }
