import { useState, useEffect } from 'react'
import { fetchSummary, fetchEvPool, fetchTrends } from '../services/api'
import { Zap, BatteryFull, BatteryCharging, BatteryWarning, TrendingUp, Activity } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function KPICard({ icon: Icon, label, value, sub, color, bgColor }) {
  return (
    <div className="rounded-2xl border p-5 transition hover:shadow-md" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bgColor }}>
          <Icon size={20} style={{ color }} />
        </div>
        <TrendingUp size={16} style={{ color: '#43A047' }} />
      </div>
      <div className="text-2xl font-bold" style={{ color: '#1E293B' }}>{value}</div>
      <div className="text-sm mt-1" style={{ color: '#64748B' }}>{label}</div>
      {sub && <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{sub}</div>}
    </div>
  )
}

function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div className={`rounded-2xl border p-5 ${className}`} style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
      <div className="mb-4">
        <h3 className="font-bold text-sm" style={{ color: '#1E293B' }}>{title}</h3>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function BatteryHealthDonut({ label, percentage, color }) {
  const size = 80
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  // Buat warna muda untuk background tengah
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 }
  }
  const rgb = hexToRgb(color)
  const lightBg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center colored circle + percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: size - strokeWidth * 2 - 4,
              height: size - strokeWidth * 2 - 4,
              background: lightBg,
            }}
          >
            <span className="text-xs font-bold" style={{ color: '#1E293B' }}>{percentage}%</span>
          </div>
        </div>
      </div>
      <div className="text-xs font-medium mt-2" style={{ color: '#64748B' }}>{label}</div>
    </div>
  )
}

function EVStatusBadge({ status }) {
  const styles = {
    'Full V2G': { bg: '#E8F5E9', color: '#2E7D32' },
    'Limited V2G': { bg: '#FFF3E0', color: '#E65100' },
    'Protected': { bg: '#FFEBEE', color: '#C62828' },
  }
  const s = styles[status] || styles.Protected
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ background: s.bg, color: s.color }}>
      {status}
    </span>
  )
}

export default function DashboardPage() {
  const [summary, setSummary] = useState(null)
  const [evPool, setEvPool] = useState([])
  const [trends, setTrends] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetchSummary().catch(() => null),
      fetchEvPool().catch(() => ({ data: [] })),
      fetchTrends().catch(() => null),
    ]).then(([sum, ev, tr]) => {
      setSummary(sum)
      setEvPool(ev?.data || [])
      setTrends(tr)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm" style={{ color: '#64748B' }}>Memuat data...</p>
        </div>
      </div>
    )
  }

  const voltageData = [
    { name: 'B1', voltage: 3.72, current: 45.2 },
    { name: 'B2', voltage: 3.65, current: 28.4 },
    { name: 'B3', voltage: 3.58, current: 52.1 },
    { name: 'B4', voltage: 3.42, current: 48.7 },
    { name: 'B5', voltage: 3.21, current: 55.3 },
    { name: 'B6', voltage: 3.68, current: 42.0 },
  ]

  const tempData = [
    { name: 'Jan', temp: 32.1, avg: 30.5 },
    { name: 'Feb', temp: 33.4, avg: 31.2 },
    { name: 'Mar', temp: 34.8, avg: 32.0 },
    { name: 'Apr', temp: 35.2, avg: 32.8 },
    { name: 'Mei', temp: 36.1, avg: 33.5 },
    { name: 'Jun', temp: 34.9, avg: 34.1 },
    { name: 'Jul', temp: 33.7, avg: 34.5 },
    { name: 'Agu', temp: 32.5, avg: 34.8 },
  ]

  const donutData = [
    { name: 'Running', value: 67, color: '#43A047' },
    { name: 'Inactive', value: 46, color: '#1E88E5' },
    { name: 'Idle', value: 67, color: '#FB8C00' },
    { name: 'Stop', value: 15, color: '#E53935' },
  ]

  return (
    <div className="space-y-6">
      {/* Header with date range */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#1E293B' }}>Battery Diagnostics Dashboard</h2>
          <p className="text-sm mt-1" style={{ color: '#64748B' }}>Monitor kondisi baterai EV, status V2G, dan hasil grading secara real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="date" defaultValue="2025-01-02" className="px-3 py-2 rounded-xl text-sm border" style={{ borderColor: '#E2E8F0', color: '#1E293B' }} />
          <input type="date" defaultValue="2025-08-30" className="px-3 py-2 rounded-xl text-sm border" style={{ borderColor: '#E2E8F0', color: '#1E293B' }} />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={Zap} label="Total EV Terdaftar" value={summary?.total_ev || 0} sub="Kendaraan aktif" color="#1E88E5" bgColor="#E3F2FD" />
        <KPICard icon={BatteryCharging} label="Kapasitas VPP" value={`${summary?.total_vpp_kwh || 0} kWh`} sub={`${summary?.v2g_full || 0} EV Full V2G`} color="#43A047" bgColor="#E8F5E9" />
        <KPICard icon={BatteryFull} label="Baterai Ter-Grading" value={summary?.total_grading || 0} sub={`Rata-rata SoH: ${summary?.avg_soh || 0}%`} color="#FB8C00" bgColor="#FFF3E0" />
        <KPICard icon={BatteryWarning} label="Grade A (BESS)" value={summary?.grade_a || 0} sub={`B: ${summary?.grade_b || 0} · C: ${summary?.grade_c || 0}`} color="#E53935" bgColor="#FFEBEE" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Voltage */}
        <ChartCard title="Live Voltage" subtitle="Tegangan baterai per unit (simulasi)">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={voltageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} domain={[3.0, 4.0]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Line type="monotone" dataKey="voltage" stroke="#1E88E5" strokeWidth={2} dot={{ fill: '#1E88E5', r: 4 }} name="Voltage (V)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Live Temperature Feed */}
        <ChartCard title="Live Temperature Feed" subtitle="Min 1.2 · Max 5.33 · Avg 2.43">
          <div className="flex gap-4 mb-3">
            {[
              { label: '1 Day', active: true },
              { label: '1 Week', active: false },
            ].map(tab => (
              <button
                key={tab.label}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${tab.active ? 'text-white' : ''}`}
                style={tab.active ? { background: '#1E88E5' } : { color: '#64748B', background: '#F1F5F9' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={tempData}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1E88E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Area type="monotone" dataKey="temp" stroke="#1E88E5" strokeWidth={2} fill="url(#tempGrad)" name="Suhu (°C)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Measured Metrics + Battery Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Measured Metrics */}
        <ChartCard title="Measured Metrics" subtitle="Thermal spikes increased by 12% this quarter during high-speed charging">
          <div className="space-y-4">
            {[
              { label: 'Average Voltage', value: '2.75V', pct: 68, color: '#1E88E5' },
              { label: 'Average Temperature', value: '34.27°C', pct: 72, color: '#FB8C00' },
              { label: 'Average Impedance', value: '0.0161 ohms', pct: 45, color: '#43A047' },
              { label: 'Average Capacity', value: '100 mAh', pct: 85, color: '#1E88E5' },
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: '#64748B' }}>{m.label}</span>
                  <span className="font-semibold" style={{ color: m.color }}>{m.value}</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: '#F1F5F9' }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.pct}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Battery Health */}
        <ChartCard title="Battery Health" subtitle="SIGERAK AI monitors battery behaviour in real time">
          <div className="flex items-center gap-4 mb-4">
            {[
              { label: 'Running', color: '#43A047' },
              { label: 'Inactive', color: '#1E88E5' },
              { label: 'Idle', color: '#FB8C00' },
              { label: 'Stop', color: '#E53935' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                <span className="text-xs" style={{ color: '#64748B' }}>{l.label}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {donutData.map(d => (
              <BatteryHealthDonut key={d.name} label={d.name} percentage={d.value} color={d.color} />
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl text-xs" style={{ background: '#F8FAFC', color: '#64748B' }}>
            SIGERAK AI memantau kondisi baterai secara real-time, mendeteksi potensi kegagalan dan degradasi.
          </div>
        </ChartCard>
      </div>

      {/* EV Pool Table */}
      <ChartCard title="EV Pool Status" subtitle="Daftar kendaraan terdaftar dalam sistem V2G">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: '#E2E8F0' }}>
                {['Plat', 'Pemilik', 'Model', 'SoC', 'SoH', 'Status V2G', 'Lokasi'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#64748B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evPool.slice(0, 6).map(ev => (
                <tr key={ev.id} className="border-b hover:bg-gray-50 transition" style={{ borderColor: '#F1F5F9' }}>
                  <td className="px-4 py-3 font-mono font-medium" style={{ color: '#1E293B' }}>{ev.plate}</td>
                  <td className="px-4 py-3" style={{ color: '#1E293B' }}>{ev.owner}</td>
                  <td className="px-4 py-3" style={{ color: '#64748B' }}>{ev.model}</td>
                  <td className="px-4 py-3 font-mono" style={{ color: '#1E293B' }}>{ev.soc}%</td>
                  <td className="px-4 py-3 font-mono" style={{ color: ev.soh >= 80 ? '#43A047' : '#FB8C00' }}>{ev.soh}%</td>
                  <td className="px-4 py-3"><EVStatusBadge status={ev.v2g_status} /></td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#64748B' }}>{ev.location || 'Lokasi'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  )
}
