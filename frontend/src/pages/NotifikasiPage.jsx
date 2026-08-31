import { Bell, Zap, AlertTriangle, CheckCircle } from 'lucide-react'

const notifications = [
  { title: 'V2G dimulai', desc: 'Sesi V2G otomatis dimulai pukul 18:00.', time: '2 jam lalu', type: 'info', icon: Zap },
  { title: 'SOC mendekati batas minimum', desc: 'SOC saat ini 52%, mendekati ambang 50%.', time: 'Kemarin', type: 'warning', icon: AlertTriangle },
  { title: 'Pencairan berhasil', desc: 'Rp 40.000 dicairkan ke GoPay.', time: '20 Mei', type: 'success', icon: CheckCircle },
]

const typeStyles = {
  info: { bg: '#EAF0FF', color: '#2F5AF7' },
  warning: { bg: '#FEF3E1', color: '#D97706' },
  success: { bg: '#E9F8EF', color: '#16A34A' },
}

export default function NotifikasiPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D', letterSpacing: '-0.5px' }}>Notifikasi</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Pemberitahuan seputar status kendaraan dan V2G.</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', overflow: 'hidden' }}>
        {notifications.map((n, i) => {
          const s = typeStyles[n.type]
          const Icon = n.icon
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: i < notifications.length - 1 ? '1px solid #F1F3F5' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.bg }}>
                  <Icon size={18} style={{ color: s.color }} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#151A2D' }}>{n.title}</div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '3px' }}>{n.desc}</div>
                </div>
              </div>
              <span style={{ fontSize: '12px', color: '#98A1B0', whiteSpace: 'nowrap' }}>{n.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
