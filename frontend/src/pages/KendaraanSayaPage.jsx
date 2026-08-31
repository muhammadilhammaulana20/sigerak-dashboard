import { useState } from 'react'

export default function KendaraanSayaPage() {
  const [vehicle, setVehicle] = useState({
    name: 'EV-001 (Hyundai Ioniq 5)',
    cap: 72,
    soc: 85,
    minSoc: 50,
    conn: 'CCS2 (bidirectional)',
  })
  const [editOpen, setEditOpen] = useState(false)
  const [form, setForm] = useState({ ...vehicle })

  const handleSave = () => {
    setVehicle({ ...form })
    setEditOpen(false)
  }

  const socDeg = (vehicle.soc / 100) * 360
  const socColor = vehicle.soc >= 60 ? '#16A34A' : vehicle.soc >= 30 ? '#D97706' : '#DC2626'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D', letterSpacing: '-0.5px' }}>Kendaraan saya</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Detail kendaraan dan kapasitas baterai yang terhubung ke SIGERAK.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {/* Detail Card */}
        <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <strong style={{ fontSize: '16px', color: '#151A2D' }}>{vehicle.name}</strong>
              <div style={{ fontSize: '12.5px', color: '#98A1B0', marginTop: '2px' }}>Koneksi aktif ke charger</div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '100px', background: '#EAF0FF', color: '#2F5AF7' }}>V2G Capable</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              ['Kapasitas baterai', `${vehicle.cap} kWh`],
              ['SOC saat ini', `${vehicle.soc}%`],
              ['Min. SOC diizinkan', `${vehicle.minSoc}%`],
              ['Konektor', vehicle.conn],
              ['Status charger', 'Terhubung'],
            ].map(([label, val], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 4 ? '1px solid #F1F3F5' : 'none' }}>
                <span style={{ fontSize: '13.5px', color: '#6B7280' }}>{label}</span>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: label === 'Status charger' ? '#16A34A' : '#151A2D' }}>{val}</span>
              </div>
            ))}
          </div>

          <button onClick={() => { setForm({ ...vehicle }); setEditOpen(!editOpen) }} style={{ marginTop: '20px', width: '100%', background: '#F9FAFB', border: '1px solid #E4E7EE', borderRadius: '10px', padding: '11px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: '#151A2D', transition: 'all 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#F1F3F5'} onMouseLeave={e => e.currentTarget.style.background = '#F9FAFB'}>
            {editOpen ? 'Tutup form' : 'Edit detail kendaraan'}
          </button>

          {editOpen && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E4E7EE' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>Nama kendaraan</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>Kapasitas (kWh)</label>
                  <input type="number" value={form.cap} onChange={e => setForm({ ...form, cap: +e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>SOC saat ini (%)</label>
                  <input type="number" value={form.soc} onChange={e => setForm({ ...form, soc: +e.target.value })} min="0" max="100" style={{ width: '100%', padding: '10px 12px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>Min. SOC (%)</label>
                  <input type="number" value={form.minSoc} onChange={e => setForm({ ...form, minSoc: +e.target.value })} min="0" max="100" style={{ width: '100%', padding: '10px 12px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }} />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>Konektor</label>
                  <select value={form.conn} onChange={e => setForm({ ...form, conn: e.target.value })} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}>
                    <option>CCS2 (bidirectional)</option>
                    <option>CHAdeMO (bidirectional)</option>
                    <option>Type 2 (AC only)</option>
                  </select>
                </div>
              </div>
              <button onClick={handleSave} style={{ marginTop: '14px', width: '100%', background: '#2F5AF7', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Simpan perubahan</button>
            </div>
          )}
        </div>

        {/* SOC Gauge */}
        <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '160px', height: '160px' }}>
            {/* Outer ring */}
            <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="70" fill="none" stroke="#F1F3F5" strokeWidth="12" />
              <circle cx="80" cy="80" r="70" fill="none" stroke={socColor} strokeWidth="12" strokeDasharray={`${socDeg * 1.222} 440`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s ease' }} />
            </svg>
            {/* Center */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: socColor, letterSpacing: '-1px' }}>{vehicle.soc}%</div>
              <div style={{ fontSize: '12px', color: '#98A1B0', fontWeight: 500, marginTop: '2px' }}>SOC</div>
            </div>
          </div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: '#6B7280' }}>Target sebelum berangkat</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#151A2D', marginTop: '4px' }}>{vehicle.minSoc}% (besok 07:00)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
