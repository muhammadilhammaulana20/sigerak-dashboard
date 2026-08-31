import { useState } from 'react'
import { Zap, Shield, AlertTriangle } from 'lucide-react'

export default function StatusV2GPage() {
  const [soc, setSoc] = useState(85)
  const [v2gActive, setV2gActive] = useState(false)
  const minSoc = 50
  const cap = 72
  const needKwh = 8

  const availableKwh = Math.max(0, ((soc - minSoc) / 100) * cap)
  const buffer = 5
  const aman = soc >= (minSoc + buffer) && availableKwh >= needKwh
  const risk = Math.max(0, Math.min(100, Math.round((minSoc + buffer - soc) * 2 + 15)))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D' }}>Status V2G</h1>
        <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Analisis kelayakan partisipasi kendaraan Anda.</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#151A2D' }}>Simulasikan SOC</label>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#2F5AF7' }}>{soc}%</div>
        </div>
        <input type="range" min="0" max="100" value={soc} onChange={e => setSoc(+e.target.value)} style={{ width: '100%', accentColor: '#2F5AF7' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: '#98A1B0' }}>
          <span>0%</span><span>Min: {minSoc}%</span><span>100%</span>
        </div>
      </div>

      <div className="grid-2">
        <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '18px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#151A2D', margin: '0 0 12px' }}>Analisis Kelayakan</h3>
          {[
            ['Durasi parkir', '14 jam'],
            ['Kebutuhan perjalanan', '8 kWh'],
            ['Energi tersedia', `${availableKwh.toFixed(1)} kWh`],
            ['Risk Score', `${risk}/100 (${risk < 40 ? 'rendah' : risk < 70 ? 'sedang' : 'tinggi'})`],
          ].map(([label, val], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid #F1F3F5' : 'none', fontSize: '13px' }}>
              <span style={{ color: '#6B7280' }}>{label}</span>
              <span style={{ fontWeight: 600, color: '#151A2D' }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ borderRadius: '14px', padding: '18px', border: '1px solid', background: aman ? '#E9F8EF' : '#FDEDED', borderColor: aman ? '#C6F6D5' : '#FED7D7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            {aman ? <Shield size={18} style={{ color: '#16A34A' }} /> : <AlertTriangle size={18} style={{ color: '#DC2626' }} />}
            <strong style={{ fontSize: '14px', color: aman ? '#16A34A' : '#DC2626' }}>{aman ? 'Aman untuk V2G' : 'Tidak aman untuk V2G'}</strong>
          </div>
          <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.6 }}>
            {aman ? 'Hingga batas energi yang ditentukan, tanpa mengganggu perjalanan.' : 'SOC terlalu dekat dengan batas minimum.'}
          </p>
        </div>
      </div>

      <div style={{ background: v2gActive ? '#E9F8EF' : '#fff', border: `1px solid ${v2gActive ? '#C6F6D5' : '#E4E7EE'}`, borderRadius: '14px', padding: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} style={{ color: v2gActive ? '#16A34A' : '#98A1B0' }} />
              <strong style={{ fontSize: '14px', color: '#151A2D' }}>Kontrol V2G</strong>
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', marginLeft: '24px' }}>
              {v2gActive ? 'Aktif, menyalurkan daya' : aman ? 'Mode otomatis' : 'Tidak memenuhi syarat'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => aman && setV2gActive(true)} disabled={v2gActive || !aman} style={{ background: v2gActive || !aman ? '#E4E7EE' : '#2F5AF7', color: v2gActive || !aman ? '#98A1B0' : '#fff', border: 'none', borderRadius: '8px', padding: '9px 16px', fontSize: '12px', fontWeight: 600, cursor: v2gActive || !aman ? 'not-allowed' : 'pointer' }}>Mulai</button>
            <button onClick={() => setV2gActive(false)} disabled={!v2gActive} style={{ background: !v2gActive ? '#F9FAFB' : '#FDEDED', color: !v2gActive ? '#98A1B0' : '#DC2626', border: !v2gActive ? '1px solid #E4E7EE' : '1px solid #FED7D7', borderRadius: '8px', padding: '9px 16px', fontSize: '12px', fontWeight: 600, cursor: !v2gActive ? 'not-allowed' : 'pointer' }}>Hentikan</button>
          </div>
        </div>
      </div>
    </div>
  )
}
