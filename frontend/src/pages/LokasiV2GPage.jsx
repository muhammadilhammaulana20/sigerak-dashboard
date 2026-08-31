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
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px', color: '#151A2D', letterSpacing: '-0.5px' }}>Lokasi V2G di sekitar Anda</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Disesuaikan dengan lokasi, ketersediaan, dan tarif kompensasi.</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>Jarak maksimum</label>
            <select style={{ width: '100%', padding: '10px 14px', border: '1px solid #E4E7EE', borderRadius: '10px', fontSize: '13.5px', outline: 'none', background: '#fff' }}>
              <option>5 km</option><option>10 km</option><option>20 km</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>Daya minimum</label>
            <select style={{ width: '100%', padding: '10px 14px', border: '1px solid #E4E7EE', borderRadius: '10px', fontSize: '13.5px', outline: 'none', background: '#fff' }}>
              <option>Semua</option><option>DC Fast</option><option>AC Bidirectional</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>V2G ready saja</label>
            <div onClick={() => setReadyOnly(!readyOnly)} style={{ width: '44px', height: '24px', borderRadius: '100px', background: readyOnly ? '#2F5AF7' : '#E4E7EE', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', marginTop: '2px' }}>
              <div style={{ position: 'absolute', top: '3px', left: readyOnly ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.15)', transition: 'left 0.2s' }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '260px', background: 'linear-gradient(135deg, #E8F4FD 0%, #D1E8FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#98A1B0', fontSize: '14px', gap: '8px' }}>
          <MapPin size={20} /> Peta lokasi V2G
        </div>

        <div style={{ padding: '4px 0' }}>
          {locations.filter(l => !readyOnly || l.ready).map((loc, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: i < locations.length - 1 ? '1px solid #F1F3F5' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: loc.ready ? '#E9F8EF' : '#F1F3F5' }}>
                  <MapPin size={18} style={{ color: loc.ready ? '#16A34A' : '#98A1B0' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ fontSize: '14px', color: '#151A2D' }}>{loc.name}</strong>
                    {loc.ready && <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '100px', background: '#E9F8EF', color: '#16A34A' }}>V2G ready</span>}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#6B7280', marginTop: '3px' }}>{loc.price} &middot; {loc.connector} connector &middot; {loc.power} &middot; {loc.dist}</div>
                </div>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #E4E7EE', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: '#151A2D' }}>
                <Navigation size={14} /> Rute
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
