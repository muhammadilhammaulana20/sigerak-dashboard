import { useState } from 'react'

const cardStyle = { background: '#FFFFFF', border: '1px solid #E4E7EE', borderRadius: '12px', padding: '18px 20px' }

const defaultSchedules = [
  { time: '07:00', from: 'Rumah', to: 'Kampus', dist: 15 },
  { time: '16:00', from: 'Kampus', to: 'Rumah', dist: 15 },
  { time: '23:00', from: 'Rumah', to: 'Mall', dist: 8, optional: true },
]

export default function JadwalPerjalananPage() {
  const [schedules, setSchedules] = useState(defaultSchedules)
  const [form, setForm] = useState({ time: '', to: '', dist: '' })

  const addSchedule = () => {
    if (!form.time || !form.to) return
    setSchedules([...schedules, { time: form.time, from: 'Rumah', to: form.to, dist: +form.dist || 0 }])
    setForm({ time: '', to: '', dist: '' })
  }

  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: '#151A2D' }}>Jadwal perjalanan</h1>
      <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 22px' }}>Sistem memakai jadwal ini untuk menghitung kelayakan V2G Anda.</p>

      <div style={{ ...cardStyle, marginBottom: '14px' }}>
        {schedules.map((s, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < schedules.length - 1 ? '1px solid #E4E7EE' : 'none' }}>
            <div>
              <strong>{s.time}</strong> — {s.from} → {s.to}
              <span style={{ color: '#98A1B0' }}> · {s.dist} km</span>
              {s.optional && <span style={{ color: '#98A1B0' }}> (opsional)</span>}
            </div>
          </div>
        ))}
      </div>

      <div style={cardStyle}>
        <strong style={{ fontSize: '14px', color: '#151A2D' }}>Tambah perjalanan</strong>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Waktu keberangkatan</label>
            <input type="text" placeholder="08:00" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Tujuan</label>
            <input type="text" placeholder="Kantor" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Jarak (km)</label>
            <input type="number" placeholder="10" value={form.dist} onChange={e => setForm({ ...form, dist: e.target.value })} style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px' }} />
          </div>
        </div>
        <button onClick={addSchedule} style={{ marginTop: '14px', background: '#2F5AF7', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}>Simpan jadwal</button>
      </div>
    </div>
  )
}
