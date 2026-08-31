import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Shield, Users, Zap, BatteryFull, BatteryCharging } from 'lucide-react'

export default function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  const handleRoleLogin = (role) => {
    if (role === 'pengelola') login('admin', 'sigerak123')
    else login('user1', 'user13')
    navigate('/', { replace: true })
  }

  const roles = [
    { id: 'pengelola', title: 'Pengelola', subtitle: 'Akses penuh ke semua fitur', icon: Shield, color: '#2F5AF7', bgColor: '#EAF0FF', features: ['Dashboard & Analytics', 'Prediksi SoH & RUL', 'Grading & Mobility Risk', 'Export PDF'] },
    { id: 'pengguna', title: 'Pengguna', subtitle: 'Akses terbatas untuk monitoring', icon: Users, color: '#16A34A', bgColor: '#E9F8EF', features: ['Kendaraan & Jadwal', 'Status V2G & Lokasi', 'Pendapatan & Riwayat', 'Pengaturan'] },
  ]

  const statCards = [
    { icon: Zap, value: 4, label: 'EV Terdaftar', color: '#2F5AF7' },
    { icon: BatteryCharging, value: '84', label: 'Kapasitas VPP', color: '#16A34A' },
    { icon: BatteryFull, value: 3, label: 'Grade A', color: '#D97706' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F3F5F8' }}>
      {/* Brand Left */}
      <div style={{ position: 'relative', display: 'none', width: '42%', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', background: 'linear-gradient(160deg, #0D1550 0%, #12183A 40%, #1A237E 100%)' }} className="hidden lg:flex">
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }} />
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '256px', height: '256px', borderRadius: '50%', opacity: 0.06, background: '#fff' }} />
        <div style={{ position: 'absolute', bottom: '128px', left: '-64px', width: '192px', height: '192px', borderRadius: '50%', opacity: 0.06, background: '#fff' }} />
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '48px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#2F5AF7' }} />
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#fff' }}>SIGERAK</span>
          </div>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '30px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '12px' }}>Sistem Integrasi<br />Gerak &amp; Regenerasi<br />Baterai EV</h1>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '260px' }}>Monitoring kondisi baterai, optimasi V2G, dan grading second life BESS.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {statCards.map((s) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)' }}>
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

      {/* Form Right */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 20px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }} className="lg:hidden">
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#2F5AF7' }} />
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#151A2D' }}>SIGERAK</span>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px', color: '#151A2D' }}>Selamat Datang</h2>
            <p style={{ fontSize: '13px', color: '#6B7280' }}>Pilih role untuk masuk ke dashboard</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {roles.map((role) => (
              <button key={role.id} onClick={() => handleRoleLogin(role.id)} style={{ width: '100%', padding: '18px', borderRadius: '12px', border: '1px solid #E4E7EE', textAlign: 'left', cursor: 'pointer', background: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: role.bgColor }}>
                    <role.icon size={22} style={{ color: role.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#151A2D', margin: '0 0 4px' }}>{role.title}</h3>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 10px' }}>{role.subtitle}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {role.features.map((f) => (
                        <span key={f} style={{ fontSize: '10px', padding: '3px 7px', borderRadius: '5px', fontWeight: 600, background: role.bgColor, color: role.color }}>{f}</span>
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
