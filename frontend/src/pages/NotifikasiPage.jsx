const cardStyle = { background: '#FFFFFF', border: '1px solid #E4E7EE', borderRadius: '12px', padding: '18px 20px' }

const notifications = [
  { title: 'V2G dimulai', desc: 'Sesi V2G otomatis dimulai pukul 18:00.', time: '2 jam lalu' },
  { title: 'SOC mendekati batas minimum', desc: 'SOC saat ini 52%, mendekati ambang 50%.', time: 'Kemarin' },
  { title: 'Pencairan berhasil', desc: 'Rp 40.000 dicairkan ke GoPay.', time: '20 Mei' },
]

export default function NotifikasiPage() {
  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: '#151A2D' }}>Notifikasi</h1>
      <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 22px' }}>Pemberitahuan seputar status kendaraan dan V2G.</p>

      <div style={cardStyle}>
        {notifications.map((n, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < notifications.length - 1 ? '1px solid #E4E7EE' : 'none' }}>
            <div>
              <strong style={{ fontSize: '13.5px', color: '#151A2D' }}>{n.title}</strong>
              <div style={{ fontSize: '12.5px', color: '#6B7280' }}>{n.desc}</div>
            </div>
            <span style={{ fontSize: '12px', color: '#98A1B0' }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
