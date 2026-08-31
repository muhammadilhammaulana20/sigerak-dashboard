import { useState } from 'react'

const cardStyle = { background: '#FFFFFF', border: '1px solid #E4E7EE', borderRadius: '12px', padding: '18px 20px' }

export default function PendapatanPage() {
  const [balance, setBalance] = useState(42500)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [method, setMethod] = useState('')
  const [msg, setMsg] = useState(null)

  const handleWithdraw = () => {
    if (!method) { setMsg({ type: 'error', text: 'Pilih tujuan pencairan terlebih dahulu.' }); return }
    setMsg({ type: 'success', text: `Pencairan Rp ${balance.toLocaleString('id-ID')} ke ${method} sedang diproses.` })
    setBalance(0)
  }

  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: '#151A2D' }}>Pendapatan</h1>
      <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 22px' }}>Rincian estimasi dan pencairan saldo kompensasi V2G.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {/* Rincian */}
        <div style={cardStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <tbody>
              {[
                ['Energi yang disalurkan', '8.4 kWh', false],
                ['Tarif kompensasi', 'Rp 2.000/kWh', false],
                ['Pendapatan kotor', 'Rp 16.800', false],
                ['Estimasi biaya degradasi', '- Rp 2.600', true],
                ['Biaya energi & loss', '- Rp 600', true],
              ].map(([label, val, red], i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 6px', borderBottom: '1px solid #E4E7EE', color: '#6B7280' }}>{label}</td>
                  <td style={{ padding: '10px 6px', borderBottom: '1px solid #E4E7EE', textAlign: 'right', color: red ? '#DC2626' : '#151A2D' }}>{val}</td>
                </tr>
              ))}
              <tr>
                <td style={{ padding: '10px 6px', fontWeight: 700 }}>Keuntungan bersih</td>
                <td style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 700 }}>Rp 13.600</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Saldo */}
        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Saldo tersedia</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#2F5AF7', marginBottom: '14px' }}>Rp {balance.toLocaleString('id-ID')}</div>
          <button onClick={() => setShowWithdraw(!showWithdraw)} style={{ background: '#2F5AF7', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}>Cairkan saldo</button>
          {showWithdraw && (
            <div style={{ marginTop: '14px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Pilih tujuan pencairan</label>
              <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px' }}>
                <option value="">— pilih —</option>
                <option>Rekening bank</option><option>GoPay</option><option>OVO</option><option>DANA</option>
              </select>
              <button onClick={handleWithdraw} style={{ marginTop: '10px', background: '#2F5AF7', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}>Konfirmasi pencairan</button>
              {msg && <div style={{ marginTop: '8px', fontSize: '13px', color: msg.type === 'error' ? '#DC2626' : '#16A34A' }}>{msg.text}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
