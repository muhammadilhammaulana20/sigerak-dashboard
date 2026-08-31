import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Zap, BatteryCharging, MapPin, DollarSign } from 'lucide-react'

const cardStyle = { background: '#FFFFFF', border: '1px solid #E4E7EE', borderRadius: '12px', padding: '18px 20px' }

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'pengelola'

  if (isAdmin) return <DashboardPengelola />

  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: '#151A2D' }}>Halo, {user?.name || 'Ilham'}</h1>
      <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 22px' }}>Kelola energi kendaraan Anda dan dapatkan manfaat dari V2G.</p>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '14px' }}>
        <div style={cardStyle}>
          <div style={{ fontSize: '12.5px', color: '#6B7280', marginBottom: '8px' }}>Status V2G</div>
          <span style={{ display: 'inline-block', fontSize: '11.5px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', background: '#E9F8EF', color: '#16A34A' }}>Layak V2G</span>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '12.5px', color: '#6B7280', marginBottom: '8px' }}>Energi tersedia untuk V2G</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#151A2D' }}>8.4 kWh</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '12.5px', color: '#6B7280', marginBottom: '8px' }}>Estimasi pendapatan hari ini</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#151A2D' }}>Rp 16.800</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '12.5px', color: '#6B7280', marginBottom: '8px' }}>Saldo kompensasi</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#151A2D' }}>Rp 42.500</div>
        </div>
      </div>

      {/* Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <strong style={{ fontSize: '14px', color: '#151A2D' }}>Ringkasan kendaraan</strong>
            <span style={{ fontSize: '11.5px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', background: '#EAF0FF', color: '#2F5AF7' }}>85% SOC</span>
          </div>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 12px' }}>EV-001 (Hyundai Ioniq 5) — terhubung ke charger, aman digunakan untuk V2G hingga 07:00 besok.</p>
          <button onClick={() => navigate('/kendaraan')} style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '8px', padding: '10px 16px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', color: '#151A2D' }}>Lihat detail kendaraan</button>
        </div>
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <strong style={{ fontSize: '14px', color: '#151A2D' }}>Lokasi V2G terdekat</strong>
          </div>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 12px' }}>Stasiun Wonokromo — ±350 m, tarif kompensasi Rp 2.000/kWh, 4/6 connector tersedia.</p>
          <button onClick={() => navigate('/lokasi-v2g')} style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '8px', padding: '10px 16px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', color: '#151A2D' }}>Lihat semua lokasi</button>
        </div>
      </div>
    </div>
  )
}

function DashboardPengelola() {
  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: '#151A2D' }}>Dashboard</h1>
      <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 22px' }}>Ringkasan kondisi baterai dan aktivitas V2G seluruh armada.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {[
          { icon: BatteryCharging, label: 'Total EV', value: '4', color: '#2F5AF7', bg: '#EAF0FF' },
          { icon: Zap, label: 'Kapasitas VPP', value: '84 kWh', color: '#16A34A', bg: '#E9F8EF' },
          { icon: MapPin, label: 'Grade A', value: '3', color: '#D97706', bg: '#FEF3E1' },
          { icon: DollarSign, label: 'Total Pendapatan', value: 'Rp 156.200', color: '#DC2626', bg: '#FDEDED' },
        ].map((s) => (
          <div key={s.label} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.bg }}>
                <s.icon size={17} style={{ color: s.color }} />
              </div>
              <span style={{ fontSize: '12.5px', color: '#6B7280' }}>{s.label}</span>
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#151A2D' }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
