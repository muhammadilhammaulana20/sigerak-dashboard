import { useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Zap, BatteryFull, BarChart3, ChevronLeft, ChevronRight, Bell, Search, User, FileDown, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const allNavItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/v2g', icon: Zap, label: 'V2G Module', adminOnly: true },
  { to: '/grading', icon: BatteryFull, label: 'Grading', adminOnly: true },
  { to: '/reports', icon: BarChart3, label: 'Reports & Insights' },
]

const allTabItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/v2g', label: 'Analytics', adminOnly: true },
  { to: '/grading', label: 'Grading', adminOnly: true },
  { to: '/reports', label: 'Reports & Insights' },
]

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const isAdmin = user?.role === 'pengelola'

  const navItems = allNavItems.filter(item => !item.adminOnly || isAdmin)
  const tabItems = allTabItems.filter(item => !item.adminOnly || isAdmin)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const roleLabel = user?.role === 'pengelola' ? 'Pengelola' : 'Pengguna'

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F8FAFC' }}>
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[240px]'}`}
        style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b" style={{ borderColor: '#E2E8F0' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0" style={{ background: 'linear-gradient(135deg, #1E88E5, #43A047)' }}>
            S
          </div>
          {!collapsed && (
            <div>
              <div className="font-bold text-sm" style={{ color: '#1E293B' }}>SIGERAK</div>
              <div className="text-[10px]" style={{ color: '#64748B' }}>Battery Intelligence</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
            return (
              <NavLink
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'text-white shadow-md'
                    : 'hover:bg-gray-50'
                }`}
                style={active ? { background: '#1E88E5' } : { color: '#64748B' }}
              >
                <Icon size={20} />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            )
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-12 border-t hover:bg-gray-50 transition cursor-pointer"
          style={{ borderColor: '#E2E8F0', color: '#64748B' }}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between h-16 px-6 border-b shrink-0" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold" style={{ color: '#1E293B' }}>
              {navItems.find(n => n.to === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 rounded-xl text-sm border outline-none focus:ring-2 focus:ring-blue-100"
                style={{ borderColor: '#E2E8F0', background: '#F8FAFC', color: '#1E293B' }}
              />
            </div>
            <button className="relative p-2 rounded-xl hover:bg-gray-50 transition cursor-pointer" style={{ color: '#64748B' }}>
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#E53935' }} />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: '#E2E8F0' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: user?.role === 'pengelola' ? '#1E88E5' : '#43A047' }}>
                <User size={16} />
              </div>
              <div className="text-xs">
                <div className="font-semibold" style={{ color: '#1E293B' }}>{user?.name || 'User'}</div>
                <div style={{ color: '#64748B' }}>{roleLabel}</div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-1 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
                style={{ color: '#94A3B8' }}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Horizontal Tab Bar */}
        <div className="flex items-center justify-between px-6 py-2 border-b shrink-0" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-1">
            {tabItems.map(tab => {
              const active = location.pathname === tab.to || (tab.to !== '/' && location.pathname.startsWith(tab.to))
              return (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    active ? 'text-white shadow-sm' : 'hover:bg-gray-50'
                  }`}
                  style={active ? { background: '#1E88E5' } : { color: '#64748B' }}
                >
                  {tab.label}
                </NavLink>
              )
            })}
          </div>
          {isAdmin && (
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer hover:shadow-sm"
              style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' }}
              onClick={() => window.print()}
            >
              <FileDown size={16} />
              <span>Export PDF</span>
            </button>
          )}
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
