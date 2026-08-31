import { useState } from 'react'

const cardStyle = { background: '#FFFFFF', border: '1px solid #E4E7EE', borderRadius: '12px', padding: '18px 20px' }

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
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: '#151A2D' }}>Kendaraan saya</h1>
      <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 22px' }}>Detail kendaraan dan kapasitas baterai yang terhubung ke SIGERAK.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {/* Detail */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <strong style={{ fontSize: '14px', color: '#151A2D' }}>{vehicle.name}</strong>
            <span style={{ fontSize: '11.5px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', background: '#EAF0FF', color: '#2F5AF7' }}>V2G capable</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <tbody>
              {[
                ['Kapasitas baterai', `${vehicle.cap} kWh`],
                ['SOC saat ini', `${vehicle.soc}%`],
                ['Min. SOC diizinkan', `${vehicle.minSoc}%`],
                ['Konektor', vehicle.conn],
                ['Status charger', 'Terhubung'],
              ].map(([label, val], i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 6px', borderBottom: '1px solid #E4E7EE', color: '#6B7280' }}>{label}</td>
                  <td style={{ padding: '10px 6px', borderBottom: '1px solid #E4E7EE', textAlign: 'right', fontWeight: 500, color: label === 'Status charger' ? '#16A34A' : '#151A2D' }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => { setForm({ ...vehicle }); setEditOpen(!editOpen) }} style={{ marginTop: '14px', background: '#fff', border: '1px solid #E4E7EE', borderRadius: '8px', padding: '10px 16px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', color: '#151A2D' }}>Edit detail kendaraan</button>

          {editOpen && (
            <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #E4E7EE' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Nama kendaraan</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Kapasitas (kWh)</label>
                  <input type="number" value={form.cap} onChange={e => setForm({ ...form, cap: +e.target.value })} style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>SOC saat ini (%)</label>
                  <input type="number" value={form.soc} onChange={e => setForm({ ...form, soc: +e.target.value })} min="0" max="100" style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Min. SOC (%)</label>
                  <input type="number" value={form.minSoc} onChange={e => setForm({ ...form, minSoc: +e.target.value })} min="0" max="100" style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px' }} />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Konektor</label>
                  <select value={form.conn} onChange={e => setForm({ ...form, conn: e.target.value })} style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px' }}>
                    <option>CCS2 (bidirectional)</option>
                    <option>CHAdeMO (bidirectional)</option>
                    <option>Type 2 (AC only)</option>
                  </select>
                </div>
              </div>
              <button onClick={handleSave} style={{ marginTop: '12px', background: '#2F5AF7', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}>Simpan perubahan</button>
            </div>
          )}
        </div>

        {/* SOC Gauge */}
        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '140px', height: '140px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `conic-gradient(${socColor} 0deg, ${socColor} ${socDeg}deg, #E4E7EE ${socDeg}deg)`,
          }}>
            <div style={{ width: '110px', height: '110px', borderRadius: '50%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: socColor }}>{vehicle.soc}%</div>
              <div style={{ fontSize: '11px', color: '#98A1B0' }}>SOC</div>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#98A1B0', marginTop: '12px' }}>Target sebelum berangkat: {vehicle.minSoc}% (besok 07:00)</div>
        </div>
      </div>
    </div>
  )
}
