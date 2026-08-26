# SIGERAK Dashboard

**Sistem Integrasi Gerak dan Regenerasi Baterai Kendaraan Listrik untuk Optimasi V2G dan Second Life BESS**

Dashboard monitoring & prediksi kesehatan baterai EV dengan dua modul terintegrasi: V2G-VPP dan Grading Second Life Battery.

## Fitur

- **Dashboard** — KPI real-time, live voltage chart, temperature feed, battery health donut, EV pool status
- **Modul V2G** — EV pool management, VPP capacity, mobility risk calculator, dispatch history
- **Modul Grading** — Input data baterai, prediksi SoH & RUL (ML), klasifikasi Grade A/B/C, rekomendasi pemanfaatan
- **Reports & Insights** — Tren SoH, kontribusi VPP, sumber data referensi

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Recharts |
| Backend | Flask, Python, scikit-learn |
| ML | Random Forest (SoH), Gradient Boosting (RUL) |
| Data | NASA PCoE, CALCE, Kemenperin, ESDM |

## Menjalankan

```bash
# Backend
cd backend
pip install -r requirements.txt
python ml/train.py        # Training model ML
python app.py              # Flask server (port 5000)

# Frontend
cd frontend
npm install
npm run dev                # Vite dev server (port 5173)
```

## API Endpoints

| Endpoint | Method | Keterangan |
|----------|--------|------------|
| `/api/summary` | GET | Ringkasan: total EV, VPP, grading |
| `/api/v2g/ev-pool` | GET | Daftar EV + status V2G |
| `/api/v2g/vpp-capacity` | GET | Kapasitas total VPP |
| `/api/v2g/dispatch-history` | GET | Riwayat dispatch |
| `/api/grading/history` | GET | Riwayat grading |
| `/api/grading/distribution` | GET | Distribusi Grade A/B/C |
| `/api/ml/predict/soh` | POST | Prediksi SoH |
| `/api/ml/predict/rul` | POST | Prediksi RUL |
| `/api/ml/predict/mobility-risk` | POST | Prediksi Mobility Risk |

## Struktur

```
sigerak-dashboard/
├── backend/
│   ├── app.py              # Flask entry point
│   ├── api/routes.py       # Public API
│   ├── api/ml_routes.py    # ML prediction API
│   ├── ml/train.py         # Training script
│   └── data/               # Mock data JSON
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/Layout.jsx
│   │   └── pages/          # Dashboard, V2G, Grading, Reports
│   └── package.json
└── README.md
```

## Sumber Data

- **NASA PCoE Battery Dataset** — Siklus baterai lithium-ion
- **CALCE Battery Data** — University of Maryland
- **Kementerian Perindustrian RI** — Populasi EV Indonesia
- **Kementerian ESDM RI** — Infrastruktur pengisian

---

© 2026 SIGERAK — Young Energy Scientist Competition (YESC)
