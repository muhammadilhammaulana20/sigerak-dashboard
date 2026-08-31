import { useState } from 'react'

export default function JadwalPerjalananPage() {
  const [schedules, setSchedules] = useState([
    { time: '07:00', from: 'Rumah', to: 'Kampus', dist: 15 },
    { time: '16:00', from: 'Kampus', to: 'Rumah', dist: 15 },
    { time: '23:00', from: 'Rumah', to: 'Mall', dist: 8, optional: true },
  ])
  const [form, setForm] = useState({ time: '', to: '', dist: '' })

  const addSchedule = () => {
    if (!form.time || !form.to) return
    setSchedules([...schedules, { time: form.time, from: 'Rumah', to: form.to, dist: +form.dist || 0 }])
    setForm({ time: '', to: '', dist: '' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D', letterSpacing: '-0.5px' }}>Jadwal perjalanan</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Sistem memakai jadwal ini untuk menghitung kelayakan V2G Anda.</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {schedules.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < schedules.length - 1 ? '1px solid #F1F3F5' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EAF0FF', fontSize: '13px', fontWeight: 700, color: '#2F5AF7' }}>
                  {s.time.slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#151A2D' }}>{s.time}</div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{s.from} &rarr; {s.to}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', color: '#98A1B0' }}>{s.dist} km</span>
                {s.optional && <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', background: '#FEF3E1', color: '#D97706' }}>Opsional</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#151A2D', margin: '0 0 16px' }}>Tambah perjalanan</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>Waktu keberangkatan</label>
            <input type="text" placeholder="08:00" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} style={{ width: '100%', padding: '11px 14px', border: '1px solid #E4E7EE', borderRadius: '10px', fontSize: '13.5px', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>Tujuan</label>
            <input type="text" placeholder="Kantor" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} style={{ width: '100%', padding: '11px 14px', border: '1px solid #E4E7EE', borderRadius: '10px', fontSize: '13.5px', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>Jarak (km)</label>
            <input type="number" placeholder="10" value={form.dist} onChange={e => setForm({ ...form, dist: e.target.value })} style={{ width: '100%', padding: '11px 14px', border: '1px solid #E4E7EE', borderRadius: '10px', fontSize: '13.5px', outline: 'none' }} />
          </div>
        </div>
        <button onClick={addSchedule} style={{ marginTop: '18px', background: '#2F5AF7', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}>Simpan jadwal</button>
      </div>
    </div>
  )
}
