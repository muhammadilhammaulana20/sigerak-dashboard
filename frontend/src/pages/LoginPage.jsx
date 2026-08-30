import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { fetchSummary } from '../services/api'
import { User, Lock, Eye, EyeOff, Zap, BatteryFull, BatteryCharging } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)
  const [stats, setStats] = useState(null)
  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  useEffect(() => {
    fetchSummary().then(setStats).catch(() => {})
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const result = login(username, password)
      if (result.success) {
        navigate('/', { replace: true })
      } else {
        setError(result.error)
        setShake(true)
        setTimeout(() => setShake(false), 500)
      }
      setLoading(false)
    }, 400)
  }

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

          {/* Footer */}
          <div className="text-[11px] text-white/30 mt-6">
            &copy; 2026 YESC — Young Energy Scientist Competition
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
            <p className="text-sm" style={{ color: '#64748B' }}>Masuk ke akun kamu untuk mengakses dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#475569' }}>Username</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }}>
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError('') }}
                  placeholder="Masukkan username"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  style={{
                    borderColor: error ? '#EF5350' : '#E2E8F0',
                    background: '#FFFFFF',
                    color: '#1E293B',
                  }}
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#475569' }}>Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }}>
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  placeholder="Masukkan password"
                  className="w-full pl-11 pr-12 py-3 rounded-xl text-sm border outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  style={{
                    borderColor: error ? '#EF5350' : '#E2E8F0',
                    background: '#FFFFFF',
                    color: '#1E293B',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors hover:opacity-70"
                  style={{ color: '#94A3B8' }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                className={`px-4 py-2.5 rounded-lg text-xs font-medium ${shake ? 'animate-shake' : ''}`}
                style={{ background: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2' }}
              >
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
              style={{ background: '#1E88E5' }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Memproses...</span>
                </div>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: '#94A3B8' }}>
              Belum punya akun? Hubungi Pengelola sistem
            </p>
          </div>

          {/* Demo accounts info */}
          <div className="mt-6 p-4 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#64748B' }}>Akun Demo</div>
            <div className="space-y-1.5 text-[11px]" style={{ color: '#94A3B8' }}>
              <div className="flex justify-between">
                <span>Admin (Pengelola)</span>
                <span className="font-mono" style={{ color: '#64748B' }}>admin / sigerak123</span>
              </div>
              <div className="flex justify-between">
                <span>User (Pengguna)</span>
                <span className="font-mono" style={{ color: '#64748B' }}>user1 / user123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
