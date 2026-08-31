import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

const transactions = [
  { date: '23 Mei 2025', time: '18:00-20:00', desc: 'Kompensasi V2G', amount: '+ Rp 14.200', color: '#16A34A', type: 'income' },
  { date: '22 Mei 2025', time: '18:00-21:00', desc: 'Kompensasi V2G', amount: '+ Rp 18.400', color: '#16A34A', type: 'income' },
  { date: '21 Mei 2025', time: '18:00-20:30', desc: 'Kompensasi V2G', amount: '+ Rp 12.600', color: '#16A34A', type: 'income' },
  { date: '20 Mei 2025', time: '-', desc: 'Pencairan ke GoPay', amount: '- Rp 40.000', color: '#DC2626', type: 'expense' },
]

export default function RiwayatTransaksiPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D' }}>Riwayat transaksi</h1>
        <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Semua pendapatan V2G dan pencairan saldo.</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', overflow: 'hidden' }}>
        {transactions.map((t, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < transactions.length - 1 ? '1px solid #F1F3F5' : 'none', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.type === 'income' ? '#E9F8EF' : '#FDEDED', flexShrink: 0 }}>
                {t.type === 'income' ? <ArrowDownRight size={16} style={{ color: '#16A34A' }} /> : <ArrowUpRight size={16} style={{ color: '#DC2626' }} />}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#151A2D' }}>{t.desc}</div>
                <div style={{ fontSize: '11.5px', color: '#98A1B0', marginTop: '1px' }}>{t.date} &middot; {t.time}</div>
              </div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: t.color, flexShrink: 0 }}>{t.amount}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
