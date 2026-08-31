const cardStyle = { background: '#FFFFFF', border: '1px solid #E4E7EE', borderRadius: '12px', padding: '18px 20px' }

const transactions = [
  { date: '23 Mei 2025', time: '18:00–20:00', desc: 'Kompensasi V2G', amount: '+ Rp 14.200', color: '#16A34A' },
  { date: '22 Mei 2025', time: '18:00–21:00', desc: 'Kompensasi V2G', amount: '+ Rp 18.400', color: '#16A34A' },
  { date: '21 Mei 2025', time: '18:00–20:30', desc: 'Kompensasi V2G', amount: '+ Rp 12.600', color: '#16A34A' },
  { date: '20 Mei 2025', time: '—', desc: 'Pencairan ke GoPay', amount: '- Rp 40.000', color: '#DC2626' },
]

export default function RiwayatTransaksiPage() {
  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: '#151A2D' }}>Riwayat transaksi</h1>
      <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 22px' }}>Semua pendapatan V2G dan pencairan saldo Anda.</p>

      <div style={cardStyle}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr>
              {['Tanggal', 'Jam', 'Keterangan', 'Jumlah'].map(h => (
                <th key={h} style={{ textAlign: 'left', color: '#98A1B0', fontWeight: 500, fontSize: '12px', padding: '8px 6px', borderBottom: '1px solid #E4E7EE' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i}>
                <td style={{ padding: '10px 6px', borderBottom: '1px solid #E4E7EE' }}>{t.date}</td>
                <td style={{ padding: '10px 6px', borderBottom: '1px solid #E4E7EE' }}>{t.time}</td>
                <td style={{ padding: '10px 6px', borderBottom: '1px solid #E4E7EE' }}>{t.desc}</td>
                <td style={{ padding: '10px 6px', borderBottom: '1px solid #E4E7EE', textAlign: 'right', color: t.color, fontWeight: 600 }}>{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
