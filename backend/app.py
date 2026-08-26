import os
from flask import Flask, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder=None)
CORS(app, supports_credentials=True)

app.secret_key = os.environ.get("SECRET_KEY", "sigerak-dev-secret-change-in-production")
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
)

from api.routes import api
from api.ml_routes import ml_api

app.register_blueprint(api)
app.register_blueprint(ml_api)

FRONTEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "frontend", "dist")

@app.route("/")
def serve_index():
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    if not os.path.exists(index_path):
        return {"error": "Frontend not built yet. Run: cd frontend && npm run build"}, 503
    resp = send_from_directory(FRONTEND_DIR, "index.html")
    resp.headers["Cache-Control"] = "no-store"
    return resp

@app.route("/assets/<path:filename>")
def serve_assets(filename):
    return send_from_directory(os.path.join(FRONTEND_DIR, "assets"), filename)

@app.route("/<path:path>")
def serve_static(path):
    file_path = os.path.join(FRONTEND_DIR, path)
    if os.path.exists(file_path):
        return send_from_directory(FRONTEND_DIR, path)
    resp = send_from_directory(FRONTEND_DIR, "index.html")
    resp.headers["Cache-Control"] = "no-store"
    return resp


if __name__ == "__main__":
    print("=" * 60)
    print("  SIGERAK Dashboard Server")
    print("  V2G-VPP + Second Life Battery Grading")
    print("  Backend API: http://127.0.0.1:5000")
    print("=" * 60)
    app.run(host="0.0.0.0", port=5000, debug=True)
