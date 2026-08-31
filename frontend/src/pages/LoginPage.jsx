import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Shield, Users, Zap, BatteryFull, BatteryCharging, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [stats] = useState({ total_ev: 4, total_vpp_kwh: 84, grade_a: 3 })

  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  const handleRoleLogin = (role) => {
    if (role === 'pengelola') {
      login('admin', 'sigerak123')
    } else {
      login('user1', 'user123')
    }
    navigate('/', { replace: true })
  }

  const roles = [
    {
      id: 'pengelola',
      title: 'Pengelola',
      subtitle: 'Akses penuh ke semua fitur',
      icon: Shield,
      color: '#2F5AF7',
      bgColor: '#EAF0FF',
      features: ['Dashboard & Analytics', 'Prediksi SoH & RUL', 'Grading & Mobility Risk', 'Export PDF'],
    },
    {
      id: 'pengguna',
      title: 'Pengguna',
      subtitle: 'Akses terbatas untuk monitoring',
      icon: Users,
      color: '#16A34A',
      bgColor: '#E9F8EF',
      features: ['Kendaraan & Jadwal', 'Status V2G & Lokasi', 'Pendapatan & Riwayat', 'Pengaturan'],
    },
  ]

  const statCards = [
    { icon: Zap, value: stats.total_ev, label: 'EV Terdaftar', color: '#2F5AF7' },
    { icon: BatteryCharging, value: `${stats.total_vpp_kwh}`, label: 'Kapasitas VPP', color: '#16A34A' },
    { icon: BatteryFull, value: stats.grade_a, label: 'Grade A', color: '#D97706' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F3F5F8' }}>
      {/* Brand Section — Kiri */}
      <div
        style={{
          position: 'relative',
          display: 'none',
          width: '42%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          background: 'linear-gradient(160deg, #0D1550 0%, #12183A 40%, #1A237E 100%)',
        }}
        className="hidden lg:flex"
      >
        {/* Dot pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Decorative shapes */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '256px', height: '256px', borderRadius: '50%', opacity: 0.06, background: '#fff' }} />
        <div style={{ position: 'absolute', bottom: '128px', left: '-64px', width: '192px', height: '192px', borderRadius: '50%', opacity: 0.06, background: '#fff' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '48px 40px' }}>
          {/* Logo & Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#2F5AF7' }} />
              <span style={{ fontWeight: 700, fontSize: '15px', color: '#fff' }}>SIGERAK</span>
            </div>
          </div>

          {/* Tagline */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '12px' }}>
              Sistem Integrasi<br />Gerak & Regenerasi<br />Baterai EV
            </h1>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '280px' }}>
              Monitoring kondisi baterai, optimasi V2G, dan grading second life BESS dalam satu platform terpadu.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {statCards.map((s) => (
              <div
                key={s.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)' }}>
                  <s.icon size={17} style={{ color: '#fff' }} />
                </div>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#fff' }}>{s.value}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Section — Kanan */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* Mobile Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }} className="lg:hidden">
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#2F5AF7' }} />
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#151A2D' }}>SIGERAK</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px', color: '#151A2D' }}>Selamat Datang</h2>
            <p style={{ fontSize: '13.5px', color: '#6B7280' }}>Pilih role untuk masuk ke dashboard</p>
          </div>

          {/* Role Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleLogin(role.id)}
                style={{
                  width: '100%',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #E4E7EE',
                  textAlign: 'left',
                  cursor: 'pointer',
                  background: '#fff',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: role.bgColor }}>
                    <role.icon size={24} style={{ color: role.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#151A2D' }}>{role.title}</h3>
                      <ArrowRight size={17} style={{ color: '#98A1B0' }} />
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#6B7280', marginBottom: '12px' }}>{role.subtitle}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {role.features.map((f) => (
                        <span key={f} style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '6px', fontWeight: 600, background: role.bgColor, color: role.color }}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
