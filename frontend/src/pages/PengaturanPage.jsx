import { useState } from 'react'
import { Settings, Battery, Bell, Cpu } from 'lucide-react'

export default function PengaturanPage() {
  const [mode, setMode] = useState('Seimbang')
  const [minSoc, setMinSoc] = useState(50)
  const [autoVpp, setAutoVpp] = useState(true)
  const [notifPensiun, setNotifPensiun] = useState(true)

  const Toggle = ({ on, onClick }) => (
    <div onClick={onClick} style={{ width: '40px', height: '22px', borderRadius: '100px', background: on ? '#2F5AF7' : '#E4E7EE', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: '3px', left: on ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.15)', transition: 'left 0.2s' }} />
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D' }}>Pengaturan</h1>
        <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Sesuaikan preferensi partisipasi V2G Anda.</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', overflow: 'hidden' }}>
        {[
          { icon: Settings, iconBg: '#EAF0FF', iconColor: '#2F5AF7', title: 'Mode prioritas', desc: 'Seimbang antara pendapatan dan kesehatan baterai.', control: 'select' },
          { icon: Battery, iconBg: '#E9F8EF', iconColor: '#16A34A', title: 'Min. SOC diizinkan', desc: 'Batas bawah SOC saat V2G aktif.', control: 'range' },
          { icon: Cpu, iconBg: '#EAF0FF', iconColor: '#2F5AF7', title: 'Agregasi otomatis ke VPP', desc: 'Gabung otomatis dengan Virtual Power Plant.', control: 'toggle', state: autoVpp, toggle: () => setAutoVpp(!autoVpp) },
          { icon: Bell, iconBg: '#FEF3E1', iconColor: '#D97706', title: 'Notifikasi fase pensiun baterai', desc: 'Peringatan saat baterai mendekati akhir hayat.', control: 'toggle', state: notifPensiun, toggle: () => setNotifPensiun(!notifPensiun) },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: i < 3 ? '1px solid #F1F3F5' : 'none', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: item.iconBg, flexShrink: 0 }}>
                <item.icon size={16} style={{ color: item.iconColor }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#151A2D' }}>{item.title}</div>
                <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '1px' }}>{item.desc}</div>
              </div>
            </div>
            {item.control === 'select' && (
              <select value={mode} onChange={e => setMode(e.target.value)} style={{ padding: '8px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '12px', background: '#fff', flexShrink: 0 }}>
                <option>Seimbang</option><option>Maksimalkan pendapatan</option><option>Lindungi baterai</option>
              </select>
            )}
            {item.control === 'range' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <input type="range" min="20" max="80" value={minSoc} onChange={e => setMinSoc(+e.target.value)} style={{ width: '100px', accentColor: '#2F5AF7' }} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#151A2D', minWidth: '32px', textAlign: 'right' }}>{minSoc}%</span>
              </div>
            )}
            {item.control === 'toggle' && <Toggle on={item.state} onClick={item.toggle} />}
          </div>
        ))}
      </div>
    </div>
  )
}
