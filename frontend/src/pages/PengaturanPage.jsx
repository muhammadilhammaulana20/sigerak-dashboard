import { useState } from 'react'

const cardStyle = { background: '#FFFFFF', border: '1px solid #E4E7EE', borderRadius: '12px', padding: '18px 20px' }

export default function PengaturanPage() {
  const [mode, setMode] = useState('Seimbang')
  const [minSoc, setMinSoc] = useState(50)
  const [autoVpp, setAutoVpp] = useState(true)
  const [notifPensiun, setNotifPensiun] = useState(true)

  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: '#151A2D' }}>Pengaturan</h1>
      <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 22px' }}>Sesuaikan preferensi partisipasi V2G Anda.</p>

      <div style={cardStyle}>
        {/* Mode Prioritas */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #E4E7EE' }}>
          <div>
            <strong style={{ fontSize: '13.5px', color: '#151A2D' }}>Mode prioritas</strong>
            <div style={{ fontSize: '12.5px', color: '#6B7280' }}>Seimbang antara pendapatan dan kesehatan baterai.</div>
          </div>
          <select value={mode} onChange={e => setMode(e.target.value)} style={{ width: 'auto', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px' }}>
            <option>Seimbang</option>
            <option>Maksimalkan pendapatan</option>
            <option>Lindungi baterai</option>
          </select>
        </div>

        {/* Min SOC */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #E4E7EE' }}>
          <div>
            <strong style={{ fontSize: '13.5px', color: '#151A2D' }}>Min. SOC diizinkan</strong>
            <div style={{ fontSize: '12.5px', color: '#6B7280' }}>Batas bawah SOC saat V2G aktif.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="range" min="20" max="80" value={minSoc} onChange={e => setMinSoc(+e.target.value)} style={{ width: '160px', accentColor: '#2F5AF7' }} />
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#151A2D', minWidth: '30px' }}>{minSoc}%</span>
          </div>
        </div>

        {/* Auto VPP */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #E4E7EE' }}>
          <strong style={{ fontSize: '13.5px', color: '#151A2D' }}>Agregasi otomatis ke VPP</strong>
          <div onClick={() => setAutoVpp(!autoVpp)} style={{ width: '38px', height: '21px', borderRadius: '100px', background: autoVpp ? '#2F5AF7' : '#E4E7EE', cursor: 'pointer', position: 'relative', transition: 'background .15s' }}>
            <div style={{ position: 'absolute', top: '2px', left: autoVpp ? '19px' : '2px', width: '17px', height: '17px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.2)', transition: 'left .15s' }} />
          </div>
        </div>

        {/* Notifikasi Pensiun */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
          <strong style={{ fontSize: '13.5px', color: '#151A2D' }}>Notifikasi fase pensiun baterai</strong>
          <div onClick={() => setNotifPensiun(!notifPensiun)} style={{ width: '38px', height: '21px', borderRadius: '100px', background: notifPensiun ? '#2F5AF7' : '#E4E7EE', cursor: 'pointer', position: 'relative', transition: 'background .15s' }}>
            <div style={{ position: 'absolute', top: '2px', left: notifPensiun ? '19px' : '2px', width: '17px', height: '17px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.2)', transition: 'left .15s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
