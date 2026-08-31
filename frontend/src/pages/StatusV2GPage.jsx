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

  const handleStart = () => { if (aman) setV2gActive(true) }
  const handleStop = () => setV2gActive(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D', letterSpacing: '-0.5px' }}>Status V2G</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Analisis kelayakan partisipasi kendaraan Anda saat ini.</p>
      </div>

      {/* SOC Slider */}
      <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: '#151A2D' }}>Simulasikan SOC saat ini</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#2F5AF7', letterSpacing: '-0.5px' }}>{soc}%</div>
          </div>
        </div>
        <input type="range" min="0" max="100" value={soc} onChange={e => setSoc(+e.target.value)} style={{ width: '100%', accentColor: '#2F5AF7', height: '6px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          <span style={{ fontSize: '12px', color: '#98A1B0' }}>0%</span>
          <span style={{ fontSize: '12px', color: '#98A1B0' }}>Min. SOC: {minSoc}%</span>
          <span style={{ fontSize: '12px', color: '#98A1B0' }}>100%</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {/* Detail */}
        <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#151A2D', margin: '0 0 16px' }}>Analisis Kelayakan</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              ['Durasi parkir', '14 jam'],
              ['Kebutuhan perjalanan besok', '≈ 8 kWh'],
              ['Energi tersedia di atas min. SOC', `≈ ${availableKwh.toFixed(1)} kWh`],
              ['Mobility Risk Score', `${risk} / 100 (${risk < 40 ? 'rendah' : risk < 70 ? 'sedang' : 'tinggi'})`],
            ].map(([label, val], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 3 ? '1px solid #F1F3F5' : 'none' }}>
                <span style={{ fontSize: '13.5px', color: '#6B7280' }}>{label}</span>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#151A2D' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Box */}
        <div style={{ borderRadius: '14px', padding: '24px', border: '1px solid', background: aman ? '#E9F8EF' : '#FDEDED', borderColor: aman ? '#C6F6D5' : '#FED7D7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            {aman ? <Shield size={20} style={{ color: '#16A34A' }} /> : <AlertTriangle size={20} style={{ color: '#DC2626' }} />}
            <strong style={{ fontSize: '15px', color: aman ? '#16A34A' : '#DC2626' }}>
              {aman ? 'Kendaraan Anda aman untuk V2G' : 'Kendaraan Anda TIDAK aman untuk V2G'}
            </strong>
          </div>
          <p style={{ fontSize: '13.5px', color: '#6B7280', margin: 0, lineHeight: 1.6 }}>
            {aman ? 'Hingga batas energi yang ditentukan, tanpa mengganggu kebutuhan perjalanan Anda.' : 'SOC terlalu dekat dengan batas minimum untuk memenuhi kebutuhan perjalanan Anda.'}
          </p>
        </div>
      </div>

      {/* Control Card */}
      <div style={{ background: v2gActive ? '#E9F8EF' : '#fff', border: `1px solid ${v2gActive ? '#C6F6D5' : '#E4E7EE'}`, borderRadius: '14px', padding: '24px', transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={18} style={{ color: v2gActive ? '#16A34A' : '#98A1B0' }} />
              <strong style={{ fontSize: '15px', color: '#151A2D' }}>Kontrol V2G</strong>
            </div>
            <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '6px', marginLeft: '28px' }}>
              {v2gActive ? 'V2G aktif · menyalurkan daya ke jaringan' : aman ? 'V2G tidak aktif · mode otomatis (seimbang)' : 'V2G tidak aktif · kendaraan tidak memenuhi syarat'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleStart} disabled={v2gActive || !aman} style={{ background: v2gActive || !aman ? '#E4E7EE' : '#2F5AF7', color: v2gActive || !aman ? '#98A1B0' : '#fff', border: 'none', borderRadius: '10px', padding: '11px 20px', fontSize: '13px', fontWeight: 600, cursor: v2gActive || !aman ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}>Mulai V2G</button>
            <button onClick={handleStop} disabled={!v2gActive} style={{ background: !v2gActive ? '#F9FAFB' : '#FDEDED', color: !v2gActive ? '#98A1B0' : '#DC2626', border: !v2gActive ? '1px solid #E4E7EE' : '1px solid #FED7D7', borderRadius: '10px', padding: '11px 20px', fontSize: '13px', fontWeight: 600, cursor: !v2gActive ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}>Hentikan</button>
          </div>
        </div>
        {v2gActive && !aman && (
          <div style={{ marginTop: '14px', padding: '12px 16px', borderRadius: '10px', background: '#FDEDED', border: '1px solid #FED7D7', fontSize: '13px', color: '#DC2626', marginLeft: '28px' }}>V2G dihentikan otomatis: SOC turun mendekati batas minimum kendaraan.</div>
        )}
      </div>
    </div>
  )
}
