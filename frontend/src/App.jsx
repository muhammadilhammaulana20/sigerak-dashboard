import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import V2GPage from './pages/V2GPage'
import GradingPage from './pages/GradingPage'
import ReportsPage from './pages/ReportsPage'
import KendaraanSayaPage from './pages/KendaraanSayaPage'
import JadwalPerjalananPage from './pages/JadwalPerjalananPage'
import StatusV2GPage from './pages/StatusV2GPage'
import LokasiV2GPage from './pages/LokasiV2GPage'
import PendapatanPage from './pages/PendapatanPage'
import RiwayatTransaksiPage from './pages/RiwayatTransaksiPage'
import NotifikasiPage from './pages/NotifikasiPage'
import PengaturanPage from './pages/PengaturanPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="v2g" element={<V2GPage />} />
            <Route path="grading" element={<GradingPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="kendaraan" element={<KendaraanSayaPage />} />
            <Route path="jadwal" element={<JadwalPerjalananPage />} />
            <Route path="status-v2g" element={<StatusV2GPage />} />
            <Route path="lokasi-v2g" element={<LokasiV2GPage />} />
            <Route path="pendapatan" element={<PendapatanPage />} />
            <Route path="riwayat" element={<RiwayatTransaksiPage />} />
            <Route path="notifikasi" element={<NotifikasiPage />} />
            <Route path="pengaturan" element={<PengaturanPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
