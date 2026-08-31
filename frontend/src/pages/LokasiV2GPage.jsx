import { useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'

const locations = [
  { name: 'Stasiun Wonokromo', price: 'Rp 2.000/kWh', connector: '4/6', ready: true, dist: '350 m', power: 'DC Fast' },
  { name: 'SPKLU Royal Plaza', price: 'Rp 1.900/kWh', connector: '2/4', ready: false, dist: '1.2 km', power: 'AC Bidirectional' },
  { name: 'PLN UP3 Surabaya Selatan', price: 'Rp 2.200/kWh', connector: '1/2', ready: false, dist: '2.5 km', power: 'DC Fast' },
  { name: 'ITS Charging Hub', price: 'Rp 1.800/kWh', connector: '3/6', ready: true, dist: '3.1 km', power: 'AC Bidirectional' },
]

export default function LokasiV2GPage() {
  const [readyOnly, setReadyOnly] = useState(true)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D' }}>Lokasi V2G</h1>
        <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Daftar lokasi charger V2G di sekitar Anda.</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '16px' }}>
        <div className="grid-3">
          <div><label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Jarak maks</label><select style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13px', background: '#fff' }}><option>5 km</option><option>10 km</option><option>20 km</option></select></div>
          <div><label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Daya minimum</label><select style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13px', background: '#fff' }}><option>Semua</option><option>DC Fast</option><option>AC Bidirectional</option></select></div>
          <div><label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>V2G ready</label><div onClick={() => setReadyOnly(!readyOnly)} style={{ width: '40px', height: '22px', borderRadius: '100px', background: readyOnly ? '#2F5AF7' : '#E4E7EE', cursor: 'pointer', position: 'relative', marginTop: '2px' }}><div style={{ position: 'absolute', top: '3px', left: readyOnly ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.15)', transition: 'left 0.2s' }} /></div></div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '180px', background: 'linear-gradient(135deg, #E8F4FD 0%, #D1E8FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#98A1B0', fontSize: '13px', gap: '6px' }}>
          <MapPin size={18} /> Peta lokasi V2G
        </div>
        {locations.filter(l => !readyOnly || l.ready).map((loc, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < locations.length - 1 ? '1px solid #F1F3F5' : 'none', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: loc.ready ? '#E9F8EF' : '#F1F3F5', flexShrink: 0 }}>
                <MapPin size={16} style={{ color: loc.ready ? '#16A34A' : '#98A1B0' }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: '13px', color: '#151A2D' }}>{loc.name}</strong>
                  {loc.ready && <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '100px', background: '#E9F8EF', color: '#16A34A' }}>Ready</span>}
                </div>
                <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '2px' }}>{loc.price} &middot; {loc.connector} &middot; {loc.dist}</div>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#fff', border: '1px solid #E4E7EE', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#151A2D', flexShrink: 0 }}>
              <Navigation size={12} /> Rute
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
