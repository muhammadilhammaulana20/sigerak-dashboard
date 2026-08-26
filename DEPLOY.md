# SIGERAK Dashboard - Deployment Guide

## Cara Deploy ke Vercel + Render (Gratis)

### Langkah 1: Siapkan GitHub Repository

1. Buka https://github.com/new
2. Buat repository baru: `sigerak-dashboard`
3. Jalankan perintah berikut di terminal:

```bash
cd C:\Users\ILHAM MAULANA\sigerak-dashboard
git init
git add .
git commit -m "Initial commit: SIGERAK Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sigerak-dashboard.git
git push -u origin main
```

---

### Langkah 2: Deploy Backend ke Render.com

1. Buka https://render.com dan daftar (gratis)
2. Klik **New +** → **Web Service**
3. Connect GitHub repository `sigerak-dashboard`
4. Isi form:
   - **Name**: `sigerak-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt && python ml/train.py`
   - **Start Command**: `gunicorn app:app`
5. Klik **Create Web Service**
6. Tunggu deploy selesai (5-10 menit)
7. Copy URL yang diberikan (contoh: `https://sigerak-backend.onrender.com`)

---

### Langkah 3: Deploy Frontend ke Vercel

1. Buka https://vercel.com dan daftar (gratis)
2. Klik **Add New...** → **Project**
3. Connect GitHub repository `sigerak-backend`
4. Isi form:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Tambah Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://sigerak-backend.onrender.com/api` (URL backend dari langkah 2)
6. Klik **Deploy**
7. Tunggu deploy selesai (2-3 menit)
8. Klik **Visit** untuk melihat dashboard

---

### Hasil Akhir

| Service | URL | Fungsi |
|---------|-----|--------|
| Frontend | `https://sigerak-dashboard.vercel.app` | Dashboard UI |
| Backend | `https://sigerak-backend.onrender.com` | API + ML |

---

### Troubleshooting

**Backend tidak bisa diakses?**
- Render free tier sleeping setelah 15 menit tidak ada request
- Pertama kali akses mungkin loading 30-60 detik

**Frontend error "Failed to fetch"?**
- Pastikan `VITE_API_URL` sudah benar
- Pastikan backend sudah deployed dan running

**Coba test backend:**
```
https://sigerak-backend.onrender.com/api/health
```

---

### Commands Reference

```bash
# Login Vercel
vercel login

# Deploy manual
cd frontend
vercel --prod

# Cek status
vercel ls
```
