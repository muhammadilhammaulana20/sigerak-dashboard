import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Zap, BatteryCharging, MapPin, DollarSign } from 'lucide-react'

const hoverBtn = { background: 'transparent', border: '1px solid #E4E7EE', borderRadius: '10px', padding: '10px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: '#151A2D' }

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'pengelola'

  if (isAdmin) return <DashboardPengelola />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D', letterSpacing: '-0.5px' }}>Halo, {user?.name || 'Ilham'}</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Kelola energi kendaraan Anda dan dapatkan manfaat dari V2G.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {[
          { label: 'Status V2G', value: 'Layak V2G', type: 'badge', color: '#16A34A', bg: '#E9F8EF' },
          { label: 'Energi tersedia untuk V2G', value: '8.4 kWh', type: 'num', color: '#2F5AF7', bg: '#EAF0FF' },
          { label: 'Estimasi pendapatan hari ini', value: 'Rp 16.800', type: 'num', color: '#16A34A', bg: '#E9F8EF' },
          { label: 'Saldo kompensasi', value: 'Rp 42.500', type: 'num', color: '#2F5AF7', bg: '#EAF0FF' },
        ].map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '20px' }}>
            <div style={{ fontSize: '12.5px', color: '#6B7280', marginBottom: '8px', fontWeight: 500 }}>{s.label}</div>
            {s.type === 'badge' ? (
              <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', background: s.bg, color: s.color }}>{s.value}</span>
            ) : (
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#151A2D', letterSpacing: '-0.5px' }}>{s.value}</div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <strong style={{ fontSize: '15px', color: '#151A2D' }}>Ringkasan kendaraan</strong>
              <div style={{ fontSize: '12.5px', color: '#98A1B0', marginTop: '2px' }}>EV-001 (Hyundai Ioniq 5)</div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', background: '#EAF0FF', color: '#2F5AF7' }}>85% SOC</span>
          </div>
          <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 16px', lineHeight: 1.6 }}>Terhubung ke charger, aman digunakan untuk V2G hingga 07:00 besok. Target SOC: 60%.</p>
          <button onClick={() => navigate('/kendaraan')} style={hoverBtn}>Lihat detail</button>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <strong style={{ fontSize: '15px', color: '#151A2D' }}>Lokasi V2G terdekat</strong>
              <div style={{ fontSize: '12.5px', color: '#98A1B0', marginTop: '2px' }}>Stasiun Wonokromo</div>
            </div>
          </div>
          <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 16px', lineHeight: 1.6 }}>350 m dari lokasi Anda. Tarif kompensasi Rp 2.000/kWh, 4/6 connector tersedia.</p>
          <button onClick={() => navigate('/lokasi-v2g')} style={hoverBtn}>Lihat semua lokasi</button>
        </div>
      </div>
    </div>
  )
}

function DashboardPengelola() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D', letterSpacing: '-0.5px' }}>Dashboard</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Ringkasan kondisi baterai dan aktivitas V2G seluruh armada.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {[
          { icon: BatteryCharging, label: 'Total EV', value: '4', color: '#2F5AF7', bg: '#EAF0FF' },
          { icon: Zap, label: 'Kapasitas VPP', value: '84 kWh', color: '#16A34A', bg: '#E9F8EF' },
          { icon: MapPin, label: 'Grade A', value: '3', color: '#D97706', bg: '#FEF3E1' },
          { icon: DollarSign, label: 'Total Pendapatan', value: 'Rp 156.200', color: '#DC2626', bg: '#FDEDED' },
        ].map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.bg }}>
                <s.icon size={17} style={{ color: s.color }} />
              </div>
              <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>{s.label}</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#151A2D', letterSpacing: '-0.5px' }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
