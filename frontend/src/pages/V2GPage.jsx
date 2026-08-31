import { useState, useEffect } from 'react'
import { fetchEvPool, fetchVppCapacity, fetchDispatchHistory, predictMobilityRisk } from '../services/api'
import { Zap, MapPin, Clock, Battery, TrendingUp, AlertTriangle } from 'lucide-react'

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

export default function V2GPage() {
  const [evPool, setEvPool] = useState([])
  const [vpp, setVpp] = useState(null)
  const [dispatch, setDispatch] = useState([])
  const [filter, setFilter] = useState('')
  const [riskInput, setRiskInput] = useState({ departure_hour: 8, parking_duration: 4, soc: 80, consistency: 0.7 })
  const [riskResult, setRiskResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetchEvPool().catch(() => ({ data: [] })),
      fetchVppCapacity().catch(() => null),
      fetchDispatchHistory().catch(() => ({ data: [] })),
    ]).then(([ev, vppData, disp]) => {
      setEvPool(ev?.data || [])
      setVpp(vppData)
      setDispatch(disp?.data || [])
      setLoading(false)
    })
  }, [])

  const filteredEv = filter ? evPool.filter(e => e.v2g_status === filter) : evPool

  const handleRiskPredict = async () => {
    try {
      const result = await predictMobilityRisk(riskInput)
      setRiskResult(result)
    } catch {
      setRiskResult({ risk_score: 45, status: 'Limited V2G' })
    }
  }

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
        <h2 className="text-2xl font-bold" style={{ color: '#1E293B' }}>Modul V2G-VPP</h2>
        <p className="text-sm mt-1" style={{ color: '#64748B' }}>Vehicle-to-Grid & Virtual Power Plant Management</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border p-5" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E8F5E9' }}>
              <Zap size={20} style={{ color: '#43A047' }} />
            </div>
            <span className="text-sm font-medium" style={{ color: '#64748B' }}>Total Kapasitas VPP</span>
          </div>
          <div className="text-2xl font-bold" style={{ color: '#1E293B' }}>{vpp?.total_kwh || 0} kWh</div>
          <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>{vpp?.total_ev || 0} EV terdaftar</div>
        </div>
        <div className="rounded-2xl border p-5" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E3F2FD' }}>
              <Battery size={20} style={{ color: '#1E88E5' }} />
            </div>
            <span className="text-sm font-medium" style={{ color: '#64748B' }}>Rata-rata per EV</span>
          </div>
          <div className="text-2xl font-bold" style={{ color: '#1E293B' }}>{vpp?.avg_per_ev || 0} kWh</div>
          <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Daya rata-rata</div>
        </div>
        <div className="rounded-2xl border p-5" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FFF3E0' }}>
              <TrendingUp size={20} style={{ color: '#FB8C00' }} />
            </div>
            <span className="text-sm font-medium" style={{ color: '#64748B' }}>Total Dispatch</span>
          </div>
          <div className="text-2xl font-bold" style={{ color: '#1E293B' }}>{dispatch.length}</div>
          <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Riwayat pengiriman daya</div>
        </div>
      </div>

      {/* Mobility Risk Calculator */}
      <div className="rounded-2xl border p-5" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={18} style={{ color: '#FB8C00' }} />
          <h3 className="font-bold text-sm" style={{ color: '#1E293B' }}>Mobility Risk Calculator</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Jam Berangkat</label>
            <input type="number" value={riskInput.departure_hour} onChange={e => setRiskInput({ ...riskInput, departure_hour: +e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:ring-2 focus:ring-blue-100" style={{ borderColor: '#E2E8F0' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Durasi Parkir (jam)</label>
            <input type="number" value={riskInput.parking_duration} onChange={e => setRiskInput({ ...riskInput, parking_duration: +e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:ring-2 focus:ring-blue-100" style={{ borderColor: '#E2E8F0' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>SoC (%)</label>
            <input type="number" value={riskInput.soc} onChange={e => setRiskInput({ ...riskInput, soc: +e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:ring-2 focus:ring-blue-100" style={{ borderColor: '#E2E8F0' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>Konsistensi (0-1)</label>
            <input type="number" step="0.1" min="0" max="1" value={riskInput.consistency} onChange={e => setRiskInput({ ...riskInput, consistency: +e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:ring-2 focus:ring-blue-100" style={{ borderColor: '#E2E8F0' }} />
          </div>
          <button onClick={handleRiskPredict}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition hover:opacity-90 cursor-pointer"
            style={{ background: '#1E88E5' }}>
            Hitung Risk
          </button>
        </div>
        {riskResult && (
          <div className="mt-4 p-4 rounded-xl flex items-center gap-4" style={{ background: '#F8FAFC' }}>
            <div>
              <div className="text-xs" style={{ color: '#64748B' }}>Risk Score</div>
              <div className="text-xl font-bold" style={{ color: '#1E293B' }}>{riskResult.risk_score}</div>
            </div>
            <div className="h-8 w-px" style={{ background: '#E2E8F0' }} />
            <div>
              <div className="text-xs" style={{ color: '#64748B' }}>Status</div>
              <EVStatusBadge status={riskResult.status} />
            </div>
          </div>
        )}
      </div>

      {/* EV Pool Table */}
      <div className="rounded-2xl border" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
        <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: '#E2E8F0' }}>
          <div>
            <h3 className="font-bold text-sm" style={{ color: '#1E293B' }}>EV Pool Status V2G</h3>
            <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Klik status untuk filter</p>
          </div>
          <div className="flex gap-2">
            {['', 'Full V2G', 'Limited V2G', 'Protected'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${filter === s ? 'text-white' : ''}`}
                style={filter === s ? { background: '#1E88E5' } : { color: '#64748B', background: '#F1F5F9' }}>
                {s || 'Semua'}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: '#E2E8F0' }}>
                {['Plat', 'Pemilik', 'Model', 'Kapasitas', 'SoC', 'SoH', 'Status', 'Lokasi', 'Terakhir Dispatch'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#64748B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEv.map(ev => (
                <tr key={ev.id} className="border-b hover:bg-gray-50 transition" style={{ borderColor: '#F1F5F9' }}>
                  <td className="px-4 py-3 font-mono font-medium" style={{ color: '#1E293B' }}>{ev.plate}</td>
                  <td className="px-4 py-3" style={{ color: '#1E293B' }}>{ev.owner}</td>
                  <td className="px-4 py-3" style={{ color: '#64748B' }}>{ev.model}</td>
                  <td className="px-4 py-3 font-mono" style={{ color: '#1E293B' }}>{ev.battery_capacity} kWh</td>
                  <td className="px-4 py-3 font-mono" style={{ color: ev.soc >= 70 ? '#43A047' : '#FB8C00' }}>{ev.soc}%</td>
                  <td className="px-4 py-3 font-mono" style={{ color: ev.soh >= 80 ? '#43A047' : '#FB8C00' }}>{ev.soh}%</td>
                  <td className="px-4 py-3"><EVStatusBadge status={ev.v2g_status} /></td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#64748B' }}>{ev.location || 'Lokasi'}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#94A3B8' }}>{ev.last_dispatch || 'Belum ada'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch History */}
      <div className="rounded-2xl border" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
        <div className="p-5 border-b" style={{ borderColor: '#E2E8F0' }}>
          <h3 className="font-bold text-sm" style={{ color: '#1E293B' }}>Riwayat Dispatch</h3>
          <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>10 pengiriman daya terakhir ke grid</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: '#E2E8F0' }}>
                {['Plat', 'Tanggal', 'Durasi', 'Energi', 'Kompensasi', 'Kebutuhan Grid'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#64748B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dispatch.map((d, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition" style={{ borderColor: '#F1F5F9' }}>
                  <td className="px-4 py-3 font-mono font-medium" style={{ color: '#1E293B' }}>{d.ev_plate}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#64748B' }}>{d.dispatch_date}</td>
                  <td className="px-4 py-3" style={{ color: '#1E293B' }}>{d.duration_minutes} menit</td>
                  <td className="px-4 py-3 font-mono font-semibold" style={{ color: '#1E88E5' }}>{d.energy_kwh} kWh</td>
                  <td className="px-4 py-3 font-mono" style={{ color: '#43A047' }}>Rp {d.compensation_rp.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#64748B' }}>{d.grid_demand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
