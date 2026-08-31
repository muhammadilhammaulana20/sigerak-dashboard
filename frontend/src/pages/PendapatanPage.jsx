import { useState } from 'react'
import { Wallet, ArrowDownRight } from 'lucide-react'

export default function PendapatanPage() {
  const [balance, setBalance] = useState(42500)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [method, setMethod] = useState('')
  const [msg, setMsg] = useState(null)

  const handleWithdraw = () => {
    if (!method) { setMsg({ type: 'error', text: 'Pilih tujuan pencairan.' }); return }
    setMsg({ type: 'success', text: `Pencairan Rp ${balance.toLocaleString('id-ID')} ke ${method} sedang diproses.` })
    setBalance(0)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D' }}>Pendapatan</h1>
        <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Rincian estimasi dan pencairan saldo V2G.</p>
      </div>

      <div className="grid-2">
        <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '18px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#151A2D', margin: '0 0 12px' }}>Rincian Pendapatan</h3>
          {[
            ['Energi disalurkan', '8.4 kWh', false],
            ['Tarif kompensasi', 'Rp 2.000/kWh', false],
            ['Pendapatan kotor', 'Rp 16.800', false],
            ['Biaya degradasi', '- Rp 2.600', true],
            ['Biaya energi & loss', '- Rp 600', true],
          ].map(([label, val, red], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 4 ? '1px solid #F1F3F5' : 'none', fontSize: '13px' }}>
              <span style={{ color: '#6B7280' }}>{label}</span>
              <span style={{ fontWeight: red ? 500 : 600, color: red ? '#DC2626' : '#151A2D' }}>{val}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '14px' }}>
            <span style={{ fontWeight: 700, color: '#151A2D' }}>Keuntungan bersih</span>
            <span style={{ fontWeight: 700, color: '#16A34A' }}>Rp 13.600</span>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EAF0FF' }}>
              <Wallet size={15} style={{ color: '#2F5AF7' }} />
            </div>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>Saldo tersedia</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#2F5AF7', margin: '6px 0 16px' }}>Rp {balance.toLocaleString('id-ID')}</div>
          <button onClick={() => setShowWithdraw(!showWithdraw)} style={{ background: '#2F5AF7', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
            <ArrowDownRight size={14} /> Cairkan saldo
          </button>
          {showWithdraw && (
            <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #E4E7EE' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Pilih tujuan</label>
              <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13px', background: '#fff' }}>
                <option value="">Pilih tujuan...</option>
                <option>Rekening bank</option><option>GoPay</option><option>OVO</option><option>DANA</option>
              </select>
              <button onClick={handleWithdraw} style={{ marginTop: '10px', width: '100%', background: '#16A34A', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Konfirmasi</button>
              {msg && <div style={{ marginTop: '8px', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', background: msg.type === 'error' ? '#FDEDED' : '#E9F8EF', color: msg.type === 'error' ? '#DC2626' : '#16A34A' }}>{msg.text}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
