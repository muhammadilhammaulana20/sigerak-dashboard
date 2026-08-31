import { useState } from 'react'
import { Wallet, ArrowDownRight } from 'lucide-react'

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D', letterSpacing: '-0.5px' }}>Pendapatan</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Rincian estimasi dan pencairan saldo kompensasi V2G.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {/* Rincian */}
        <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#151A2D', margin: '0 0 16px' }}>Rincian Pendapatan</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              ['Energi yang disalurkan', '8.4 kWh', false],
              ['Tarif kompensasi', 'Rp 2.000/kWh', false],
              ['Pendapatan kotor', 'Rp 16.800', false],
              ['Estimasi biaya degradasi', '- Rp 2.600', true],
              ['Biaya energi & loss', '- Rp 600', true],
            ].map(([label, val, red], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 4 ? '1px solid #F1F3F5' : 'none' }}>
                <span style={{ fontSize: '13.5px', color: '#6B7280' }}>{label}</span>
                <span style={{ fontSize: '13.5px', fontWeight: red ? 500 : 600, color: red ? '#DC2626' : '#151A2D' }}>{val}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#F9FAFB', margin: '0 -24px', padding: '14px 24px', borderRadius: '0 0 12px 12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#151A2D' }}>Keuntungan bersih</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#16A34A' }}>Rp 13.600</span>
            </div>
          </div>
        </div>

        {/* Saldo */}
        <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EAF0FF' }}>
              <Wallet size={17} style={{ color: '#2F5AF7' }} />
            </div>
            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500 }}>Saldo tersedia</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#2F5AF7', letterSpacing: '-1px', margin: '8px 0 20px' }}>Rp {balance.toLocaleString('id-ID')}</div>
          <button onClick={() => setShowWithdraw(!showWithdraw)} style={{ background: '#2F5AF7', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 20px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', transition: 'opacity 0.15s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <ArrowDownRight size={16} /> Cairkan saldo
          </button>
          {showWithdraw && (
            <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: '1px solid #E4E7EE' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>Pilih tujuan pencairan</label>
              <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #E4E7EE', borderRadius: '10px', fontSize: '13.5px', outline: 'none', background: '#fff' }}>
                <option value="">Pilih tujuan...</option>
                <option>Rekening bank</option><option>GoPay</option><option>OVO</option><option>DANA</option>
              </select>
              <button onClick={handleWithdraw} style={{ marginTop: '12px', width: '100%', background: '#16A34A', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Konfirmasi pencairan</button>
              {msg && <div style={{ marginTop: '10px', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', background: msg.type === 'error' ? '#FDEDED' : '#E9F8EF', color: msg.type === 'error' ? '#DC2626' : '#16A34A' }}>{msg.text}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
