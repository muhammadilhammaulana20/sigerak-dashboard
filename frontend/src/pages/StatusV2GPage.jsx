import { useState } from 'react'

const cardStyle = { background: '#FFFFFF', border: '1px solid #E4E7EE', borderRadius: '12px', padding: '18px 20px' }

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

  const handleStart = () => {
    if (aman) setV2gActive(true)
  }

  const handleStop = () => setV2gActive(false)

  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: '#151A2D' }}>Status V2G</h1>
      <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 22px' }}>Analisis kelayakan partisipasi kendaraan Anda saat ini.</p>

      {/* SOC Slider */}
      <div style={{ ...cardStyle, marginBottom: '14px' }}>
        <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Simulasikan SOC saat ini (untuk uji coba analisis)</label>
        <input type="range" min="0" max="100" value={soc} onChange={e => setSoc(+e.target.value)} style={{ width: '100%', accentColor: '#2F5AF7' }} />
        <div style={{ fontSize: '12.5px', color: '#6B7280', marginTop: '6px' }}>SOC: <strong>{soc}%</strong> · Min. SOC kendaraan: {minSoc}%</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {/* Detail */}
        <div style={cardStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <tbody>
              {[
                ['Durasi parkir', '14 jam'],
                ['Kebutuhan perjalanan besok', '≈ 8 kWh'],
                ['Energi tersedia di atas min. SOC', `≈ ${availableKwh.toFixed(1)} kWh`],
                ['Mobility Risk Score', `${risk} / 100 (${risk < 40 ? 'rendah' : risk < 70 ? 'sedang' : 'tinggi'})`],
              ].map(([label, val], i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 6px', borderBottom: '1px solid #E4E7EE', color: '#6B7280' }}>{label}</td>
                  <td style={{ padding: '10px 6px', borderBottom: '1px solid #E4E7EE', textAlign: 'right', fontWeight: 500, color: '#151A2D' }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Status Box */}
        <div style={{ borderRadius: '10px', padding: '14px 16px', border: '1px solid', background: aman ? '#E9F8EF' : '#FDEDED', borderColor: aman ? '#CFEFDA' : '#F4C7C7' }}>
          <strong style={{ fontSize: '14px', color: aman ? '#16A34A' : '#DC2626' }}>
            {aman ? 'Kendaraan Anda aman digunakan untuk V2G' : 'Kendaraan Anda TIDAK aman untuk V2G saat ini'}
          </strong>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '8px' }}>
            {aman ? 'Hingga batas energi yang ditentukan, tanpa mengganggu kebutuhan perjalanan Anda.' : 'SOC terlalu dekat dengan batas minimum untuk memenuhi kebutuhan perjalanan Anda.'}
          </p>
        </div>
      </div>

      {/* Control Card */}
      <div style={{ ...cardStyle, marginTop: '14px', border: v2gActive ? '1px solid #CFEFDA' : '1px solid #E4E7EE', background: v2gActive ? '#E9F8EF' : '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ fontSize: '14px', color: '#151A2D' }}>Kontrol V2G</strong>
            <div style={{ fontSize: '12.5px', color: '#6B7280', marginTop: '4px' }}>
              {v2gActive ? 'V2G aktif · menyalurkan daya ke jaringan' : aman ? 'V2G tidak aktif · mode otomatis (seimbang)' : 'V2G tidak aktif · kendaraan tidak memenuhi syarat'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleStart} disabled={v2gActive || !aman} style={{ background: '#2F5AF7', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13.5px', fontWeight: 600, cursor: v2gActive || !aman ? 'not-allowed' : 'pointer', opacity: v2gActive || !aman ? 0.5 : 1 }}>Mulai V2G</button>
            <button onClick={handleStop} disabled={!v2gActive} style={{ background: '#FDEDED', color: '#DC2626', border: '1px solid #F4C7C7', borderRadius: '8px', padding: '10px 16px', fontSize: '13.5px', fontWeight: 600, cursor: !v2gActive ? 'not-allowed' : 'pointer', opacity: !v2gActive ? 0.5 : 1 }}>Hentikan</button>
          </div>
        </div>
        {v2gActive && !aman && (
          <div style={{ marginTop: '12px', fontSize: '13px', color: '#DC2626' }}>V2G dihentikan otomatis: SOC turun mendekati batas minimum kendaraan.</div>
        )}
      </div>
    </div>
  )
}
