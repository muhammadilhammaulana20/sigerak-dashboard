import { useState } from 'react'

export default function KendaraanSayaPage() {
  const [vehicle, setVehicle] = useState({ name: 'EV-001 (Hyundai Ioniq 5)', cap: 72, soc: 85, minSoc: 50, conn: 'CCS2 (bidirectional)' })
  const [editOpen, setEditOpen] = useState(false)
  const [form, setForm] = useState({ ...vehicle })

  const handleSave = () => { setVehicle({ ...form }); setEditOpen(false) }
  const socDeg = (vehicle.soc / 100) * 360
  const socColor = vehicle.soc >= 60 ? '#16A34A' : vehicle.soc >= 30 ? '#D97706' : '#DC2626'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D' }}>Kendaraan saya</h1>
        <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Detail kendaraan dan kapasitas baterai.</p>
      </div>

      <div className="grid-2">
        <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <strong style={{ fontSize: '15px', color: '#151A2D' }}>{vehicle.name}</strong>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', background: '#EAF0FF', color: '#2F5AF7' }}>V2G Capable</span>
          </div>
          {[
            ['Kapasitas baterai', `${vehicle.cap} kWh`],
            ['SOC saat ini', `${vehicle.soc}%`],
            ['Min. SOC diizinkan', `${vehicle.minSoc}%`],
            ['Konektor', vehicle.conn],
            ['Status charger', 'Terhubung'],
          ].map(([label, val], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 4 ? '1px solid #F1F3F5' : 'none', fontSize: '13px' }}>
              <span style={{ color: '#6B7280' }}>{label}</span>
              <span style={{ fontWeight: 600, color: label === 'Status charger' ? '#16A34A' : '#151A2D' }}>{val}</span>
            </div>
          ))}
          <button onClick={() => { setForm({ ...vehicle }); setEditOpen(!editOpen) }} style={{ marginTop: '16px', width: '100%', background: '#F9FAFB', border: '1px solid #E4E7EE', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: '#151A2D' }}>
            {editOpen ? 'Tutup form' : 'Edit detail kendaraan'}
          </button>
          {editOpen && (
            <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #E4E7EE' }}>
              <div className="grid-2" style={{ gap: '10px' }}>
                <div><label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Nama</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13px' }} /></div>
                <div><label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Kapasitas (kWh)</label><input type="number" value={form.cap} onChange={e => setForm({ ...form, cap: +e.target.value })} style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13px' }} /></div>
                <div><label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>SOC (%)</label><input type="number" value={form.soc} onChange={e => setForm({ ...form, soc: +e.target.value })} min="0" max="100" style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13px' }} /></div>
                <div><label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Min. SOC (%)</label><input type="number" value={form.minSoc} onChange={e => setForm({ ...form, minSoc: +e.target.value })} min="0" max="100" style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13px' }} /></div>
                <div style={{ gridColumn: '1/-1' }}><label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Konektor</label><select value={form.conn} onChange={e => setForm({ ...form, conn: e.target.value })} style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13px' }}><option>CCS2 (bidirectional)</option><option>CHAdeMO (bidirectional)</option><option>Type 2 (AC only)</option></select></div>
              </div>
              <button onClick={handleSave} style={{ marginTop: '12px', width: '100%', background: '#2F5AF7', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Simpan</button>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '140px', height: '140px' }}>
            <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="70" cy="70" r="60" fill="none" stroke="#F1F3F5" strokeWidth="10" />
              <circle cx="70" cy="70" r="60" fill="none" stroke={socColor} strokeWidth="10" strokeDasharray={`${socDeg * 1.047} 377`} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: socColor }}>{vehicle.soc}%</div>
              <div style={{ fontSize: '11px', color: '#98A1B0' }}>SOC</div>
            </div>
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>Target sebelum berangkat</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#151A2D', marginTop: '2px' }}>{vehicle.minSoc}% (besok 07:00)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
