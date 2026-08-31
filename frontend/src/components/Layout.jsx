import { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Car, Calendar, Zap, MapPin, DollarSign, History, Bell, Settings, ChevronLeft, ChevronRight, User, LogOut, Menu, X, ArrowLeftRight } from 'lucide-react'
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, login } = useAuth()
  const isAdmin = user?.role === 'pengelola'

  const navItems = isAdmin ? pengelolaNav : penggunaNav

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const handleSwitchRole = (role) => {
    if (role === 'pengelola') {
      login('admin', 'sigerak123')
    } else {
      login('user1', 'user123')
    }
    navigate('/', { replace: true })
  }

  const roleLabel = isAdmin ? 'Pengelola' : 'Pengguna'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F3F5F8', position: 'relative' }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40 }} />
      )}

      {/* Sidebar */}
      <aside style={{
        width: collapsed ? '64px' : '220px',
        background: '#12183A',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
        transition: 'transform 0.3s, width 0.3s',
        transform: mobileOpen ? 'translateX(0)' : undefined,
      }}
      className="sidebar-main"
      >
        {/* Logo + Close (mobile) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: '56px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#2F5AF7', flexShrink: 0 }} />
            {!collapsed && <span style={{ fontWeight: 700, fontSize: '15px', color: '#fff', letterSpacing: '0.5px' }}>SIGERAK</span>}
          </div>
          <button onClick={() => setMobileOpen(false)} className="mobile-close-btn" style={{ background: 'none', border: 'none', color: '#B7BEDA', cursor: 'pointer', display: 'none', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
            return (
              <NavLink
                key={to}
                to={to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: collapsed ? '10px 0' : '10px 14px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  marginBottom: '2px',
                  background: active ? '#2F5AF7' : 'transparent',
                  color: active ? '#fff' : '#B7BEDA',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  transition: 'all 0.15s',
                }}
              >
                <Icon size={17} style={{ flexShrink: 0 }} />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            )
          })}
        </nav>

        {/* Switch Role */}
        {!collapsed && (
          <div style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '10px', color: '#6B7280', padding: '0 6px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Switch role</div>
            <button
              onClick={() => handleSwitchRole(isAdmin ? 'pengguna' : 'pengelola')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#B7BEDA',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'background 0.15s',
              }}
            >
              <ArrowLeftRight size={14} />
              <span>{isAdmin ? 'Beralih ke Pengguna' : 'Beralih ke Pengelola'}</span>
            </button>
          </div>
        )}

        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            color: '#B7BEDA',
            background: 'none',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', marginLeft: collapsed ? '64px' : '220px', transition: 'margin-left 0.3s' }} className="main-content">
        {/* Top Bar */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', padding: '0 20px', background: '#fff', borderBottom: '1px solid #E4E7EE', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', color: '#151A2D', cursor: 'pointer', display: 'none', padding: '4px' }}>
              <Menu size={22} />
            </button>
            <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#151A2D', margin: 0 }}>
              {navItems.find(n => n.to === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700, background: isAdmin ? '#2F5AF7' : '#16A34A' }}>
                <User size={14} />
              </div>
              <div className="user-info" style={{ fontSize: '12px' }}>
                <div style={{ fontWeight: 600, color: '#151A2D' }}>{user?.name || 'User'}</div>
                <div style={{ color: '#6B7280' }}>{roleLabel}</div>
              </div>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#98A1B0', cursor: 'pointer', padding: '6px', borderRadius: '6px' }} title="Logout">
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 40px' }}>
          <div style={{ maxWidth: '1100px' }}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar-main {
            transform: ${mobileOpen ? 'translateX(0)' : 'translateX(-100%)'} !important;
            width: 240px !important;
          }
          .mobile-close-btn {
            display: block !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .main-content {
            margin-left: 0 !important;
          }
          .collapse-btn {
            display: none !important;
          }
          .user-info {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
