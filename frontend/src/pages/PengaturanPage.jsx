import { useState } from 'react'
import { Settings, Battery, Bell, Cpu } from 'lucide-react'

export default function PengaturanPage() {
  const [mode, setMode] = useState('Seimbang')
  const [minSoc, setMinSoc] = useState(50)
  const [autoVpp, setAutoVpp] = useState(true)
  const [notifPensiun, setNotifPensiun] = useState(true)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D', letterSpacing: '-0.5px' }}>Pengaturan</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Sesuaikan preferensi partisipasi V2G Anda.</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', overflow: 'hidden' }}>
        {/* Mode Prioritas */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #F1F3F5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EAF0FF' }}>
              <Settings size={18} style={{ color: '#2F5AF7' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#151A2D' }}>Mode prioritas</div>
              <div style={{ fontSize: '12.5px', color: '#6B7280', marginTop: '2px' }}>Seimbang antara pendapatan dan kesehatan baterai.</div>
            </div>
          </div>
          <select value={mode} onChange={e => setMode(e.target.value)} style={{ padding: '10px 14px', border: '1px solid #E4E7EE', borderRadius: '10px', fontSize: '13.5px', outline: 'none', background: '#fff', cursor: 'pointer' }}>
            <option>Seimbang</option>
            <option>Maksimalkan pendapatan</option>
            <option>Lindungi baterai</option>
          </select>
        </div>

        {/* Min SOC */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #F1F3F5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E9F8EF' }}>
              <Battery size={18} style={{ color: '#16A34A' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#151A2D' }}>Min. SOC diizinkan</div>
              <div style={{ fontSize: '12.5px', color: '#6B7280', marginTop: '2px' }}>Batas bawah SOC saat V2G aktif.</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="range" min="20" max="80" value={minSoc} onChange={e => setMinSoc(+e.target.value)} style={{ width: '140px', accentColor: '#2F5AF7' }} />
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#151A2D', minWidth: '36px', textAlign: 'right' }}>{minSoc}%</span>
          </div>
        </div>

        {/* Auto VPP */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #F1F3F5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EAF0FF' }}>
              <Cpu size={18} style={{ color: '#2F5AF7' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#151A2D' }}>Agregasi otomatis ke VPP</div>
              <div style={{ fontSize: '12.5px', color: '#6B7280', marginTop: '2px' }}>Gabung otomatis dengan Virtual Power Plant.</div>
            </div>
          </div>
          <div onClick={() => setAutoVpp(!autoVpp)} style={{ width: '44px', height: '24px', borderRadius: '100px', background: autoVpp ? '#2F5AF7' : '#E4E7EE', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
            <div style={{ position: 'absolute', top: '3px', left: autoVpp ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.15)', transition: 'left 0.2s' }} />
          </div>
        </div>

        {/* Notifikasi Pensiun */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FEF3E1' }}>
              <Bell size={18} style={{ color: '#D97706' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#151A2D' }}>Notifikasi fase pensiun baterai</div>
              <div style={{ fontSize: '12.5px', color: '#6B7280', marginTop: '2px' }}>Peringatan saat baterai mendekati akhir hayat.</div>
            </div>
          </div>
          <div onClick={() => setNotifPensiun(!notifPensiun)} style={{ width: '44px', height: '24px', borderRadius: '100px', background: notifPensiun ? '#2F5AF7' : '#E4E7EE', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
            <div style={{ position: 'absolute', top: '3px', left: notifPensiun ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.15)', transition: 'left 0.2s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
