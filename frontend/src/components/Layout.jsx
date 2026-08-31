import { useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Car, Calendar, Zap, MapPin, DollarSign, History, Bell, Settings, ChevronLeft, ChevronRight, User, FileDown, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const pengelolaNav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/v2g', icon: Zap, label: 'V2G Module' },
  { to: '/grading', icon: Car, label: 'Grading' },
  { to: '/reports', icon: History, label: 'Reports & Insights' },
]

const penggunaNav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/kendaraan', icon: Car, label: 'Kendaraan saya' },
  { to: '/jadwal', icon: Calendar, label: 'Jadwal perjalanan' },
  { to: '/status-v2g', icon: Zap, label: 'Status V2G' },
  { to: '/lokasi-v2g', icon: MapPin, label: 'Lokasi V2G' },
  { to: '/pendapatan', icon: DollarSign, label: 'Pendapatan' },
  { to: '/riwayat', icon: History, label: 'Riwayat transaksi' },
  { to: '/notifikasi', icon: Bell, label: 'Notifikasi' },
  { to: '/pengaturan', icon: Settings, label: 'Pengaturan' },
]

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const isAdmin = user?.role === 'pengelola'

  const navItems = isAdmin ? pengelolaNav : penggunaNav

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const roleLabel = isAdmin ? 'Pengelola' : 'Pengguna'

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F3F5F8' }}>
      {/* Sidebar */}
      <aside
        className={`flex flex-col transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[220px]'}`}
        style={{ background: '#12183A', flexShrink: 0 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-14" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: '#2F5AF7' }} />
          {!collapsed && (
            <span className="font-bold text-sm text-white tracking-wide">SIGERAK</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
            return (
              <NavLink
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all ${
                  active ? 'text-white' : 'hover:text-white'
                }`}
                style={{
                  background: active ? '#2F5AF7' : 'transparent',
                  color: active ? '#fff' : '#B7BEDA',
                }}
              >
                <Icon size={17} style={{ flexShrink: 0 }} />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            )
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-10 transition cursor-pointer"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: '#B7BEDA' }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between h-14 px-6 shrink-0" style={{ background: '#FFFFFF', borderBottom: '1px solid #E4E7EE' }}>
          <div className="flex items-center gap-4">
            <h1 className="text-[17px] font-bold" style={{ color: '#151A2D' }}>
              {navItems.find(n => n.to === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13.5px] font-semibold transition-all cursor-pointer hover:shadow-sm"
                style={{ background: '#FFFFFF', color: '#151A2D', border: '1px solid #E4E7EE' }}
                onClick={() => window.print()}
              >
                <FileDown size={15} />
                <span>Export PDF</span>
              </button>
            )}
            <div className="flex items-center gap-2 pl-3" style={{ borderLeft: '1px solid #E4E7EE' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: isAdmin ? '#2F5AF7' : '#16A34A' }}>
                <User size={15} />
              </div>
              <div className="text-xs">
                <div className="font-semibold" style={{ color: '#151A2D' }}>{user?.name || 'User'}</div>
                <div style={{ color: '#6B7280' }}>{roleLabel}</div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-1 p-1.5 rounded-lg transition cursor-pointer"
                style={{ color: '#98A1B0' }}
                title="Logout"
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto" style={{ padding: '24px 28px 60px', maxWidth: '1180px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
