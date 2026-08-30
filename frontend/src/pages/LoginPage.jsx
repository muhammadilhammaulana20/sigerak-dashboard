import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { fetchSummary } from '../services/api'
import { Shield, Users, Zap, BatteryFull, BatteryCharging, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [stats, setStats] = useState(null)
  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  useEffect(() => {
    fetchSummary().then(setStats).catch(() => {})
  }, [])

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
      color: '#1E88E5',
      bgColor: '#E3F2FD',
      features: ['Dashboard & Analytics', 'Prediksi SoH & RUL', 'Grading & Mobility Risk', 'Export PDF'],
    },
    {
      id: 'pengguna',
      title: 'Pengguna',
      subtitle: 'Akses terbatas untuk monitoring',
      icon: Users,
      color: '#43A047',
      bgColor: '#E8F5E9',
      features: ['Dashboard Monitoring', 'Lihat Reports & Insights', 'Status Baterai Real-time', 'Tanpa Export'],
    },
  ]

  const statCards = [
    { icon: Zap, value: stats?.total_ev || 0, label: 'EV Terdaftar', color: '#1E88E5' },
    { icon: BatteryCharging, value: `${stats?.total_vpp_kwh || 0}`, label: 'Kapasitas VPP', color: '#43A047' },
    { icon: BatteryFull, value: stats?.grade_a || 0, label: 'Grade A', color: '#FB8C00' },
  ]

  return (
    <div className="flex min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Brand Section — Kiri */}
      <div
        className="relative hidden lg:flex lg:w-[42%] xl:w-[45%] flex-col justify-between overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1565C0 0%, #1E88E5 40%, #2E7D32 100%)' }}
      >
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Decorative shapes */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: '#FFFFFF' }}
        />
        <div
          className="absolute bottom-32 -left-16 w-48 h-48 rounded-full opacity-10"
          style={{ background: '#FFFFFF' }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full px-10 py-12">
          {/* Logo & Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-lg"
                style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
              >
                S
              </div>
              <div>
                <div className="font-bold text-lg text-white tracking-wide">SIGERAK</div>
                <div className="text-[11px] text-white/60 tracking-wider uppercase">Battery Intelligence</div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="mb-10">
            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-3">
              Sistem Integrasi<br />Gerak & Regenerasi<br />Baterai EV
            </h1>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Monitoring kondisi baterai, optimasi V2G, dan grading second life BESS dalam satu platform terpadu.
            </p>
          </div>

          {/* Stats */}
          <div className="space-y-3">
            {statCards.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <s.icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{s.value}</div>
                  <div className="text-[11px] text-white/50">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Form Section — Kanan */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #1E88E5, #43A047)' }}
            >
              S
            </div>
            <div className="font-bold text-lg" style={{ color: '#1E293B' }}>SIGERAK</div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#1E293B' }}>Selamat Datang</h2>
            <p className="text-sm" style={{ color: '#64748B' }}>Pilih role untuk masuk ke dashboard</p>
          </div>

          {/* Role Cards */}
          <div className="space-y-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleLogin(role.id)}
                className="w-full p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 group"
                style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: role.bgColor }}
                  >
                    <role.icon size={24} style={{ color: role.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-base" style={{ color: '#1E293B' }}>{role.title}</h3>
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                        style={{ color: '#94A3B8' }}
                      />
                    </div>
                    <p className="text-xs mb-3" style={{ color: '#64748B' }}>{role.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                      {role.features.map((f) => (
                        <span
                          key={f}
                          className="text-[10px] px-2 py-1 rounded-md font-medium"
                          style={{ background: role.bgColor, color: role.color }}
                        >
                          {f}
                        </span>
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
