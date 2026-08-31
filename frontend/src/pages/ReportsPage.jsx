import { useState, useEffect } from 'react'
import { fetchTrends, fetchDataSources } from '../services/api'
import { BarChart3, ExternalLink, TrendingUp, Zap } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ReportsPage() {
  const [trends, setTrends] = useState(null)
  const [sources, setSources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetchTrends().catch(() => null),
      fetchDataSources().catch(() => []),
    ]).then(([t, s]) => {
      setTrends(t)
      setSources(s || [])
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: '#1E293B' }}>Reports & Insights</h2>
        <p className="text-sm mt-1" style={{ color: '#64748B' }}>Tren SoH, kontribusi VPP, dan sumber data</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border p-5" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E8F5E9' }}>
              <TrendingUp size={20} style={{ color: '#43A047' }} />
            </div>
            <span className="text-sm font-medium" style={{ color: '#64748B' }}>Rata-rata SoH</span>
          </div>
          <div className="text-2xl font-bold" style={{ color: '#1E293B' }}>{trends?.soh_trend?.[trends.soh_trend.length - 1]?.avg_soh || 0}%</div>
          <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Bulan ini</div>
        </div>
        <div className="rounded-2xl border p-5" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E3F2FD' }}>
              <Zap size={20} style={{ color: '#1E88E5' }} />
            </div>
            <span className="text-sm font-medium" style={{ color: '#64748B' }}>Kontribusi VPP</span>
          </div>
          <div className="text-2xl font-bold" style={{ color: '#1E293B' }}>{trends?.vpp_contribution?.[trends.vpp_contribution.length - 1]?.kwh || 0} kWh</div>
          <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Agustus 2026</div>
        </div>
        <div className="rounded-2xl border p-5" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FFF3E0' }}>
              <BarChart3 size={20} style={{ color: '#FB8C00' }} />
            </div>
            <span className="text-sm font-medium" style={{ color: '#64748B' }}>Total Sumber Data</span>
          </div>
          <div className="text-2xl font-bold" style={{ color: '#1E293B' }}>{sources.length}</div>
          <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Institusi terdaftar</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SOH Trend */}
        <div className="rounded-2xl border p-5" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
          <h3 className="font-bold text-sm mb-1" style={{ color: '#1E293B' }}>Tren SoH Rata-rata</h3>
          <p className="text-xs mb-4" style={{ color: '#64748B' }}>Degradasi State of Health baterai per bulan</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trends?.soh_trend || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} domain={[80, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Line type="monotone" dataKey="avg_soh" stroke="#43A047" strokeWidth={2} dot={{ fill: '#43A047', r: 4 }} name="SoH (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* VPP Contribution */}
        <div className="rounded-2xl border p-5" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
          <h3 className="font-bold text-sm mb-1" style={{ color: '#1E293B' }}>Potensi Kontribusi VPP</h3>
          <p className="text-xs mb-4" style={{ color: '#64748B' }}>Estimasi daya yang disumbangkan ke grid per bulan</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trends?.vpp_contribution || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="kwh" fill="#1E88E5" radius={[6, 6, 0, 0]} name="Energi (kWh)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Sources */}
      <div className="rounded-2xl border p-5" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
        <h3 className="font-bold text-sm mb-4" style={{ color: '#1E293B' }}>Sumber Data & Referensi</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sources.map((s, i) => (
            <div key={i} className="p-4 rounded-xl border flex items-start gap-3 transition hover:shadow-sm" style={{ borderColor: '#E2E8F0', background: '#F8FAFC' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#E3F2FD' }}>
                <BarChart3 size={16} style={{ color: '#1E88E5' }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold" style={{ color: '#1E293B' }}>{s.nama}</div>
                <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>{s.deskripsi}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs" style={{ color: '#94A3B8' }}>{s.sumber} · {s.tahun}</span>
                  {s.url && (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: '#1E88E5' }}>
                      Kunjungi <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}
