import { MapPin } from 'lucide-react'

const cardStyle = { background: '#FFFFFF', border: '1px solid #E4E7EE', borderRadius: '12px', padding: '18px 20px' }

const locations = [
  { name: 'Stasiun Wonokromo', price: 'Rp 2.000/kWh', connector: '4/6', ready: true, dist: '±350 m' },
  { name: 'SPKLU Royal Plaza', price: 'Rp 1.900/kWh', connector: '2/4', ready: false, dist: '±1.2 km' },
  { name: 'PLN UP3 Surabaya Selatan', price: 'Rp 2.200/kWh', connector: '1/2', ready: false, dist: '±2.5 km' },
  { name: 'ITS Charging Hub', price: 'Rp 1.800/kWh', connector: '3/6', ready: true, dist: '±3.1 km' },
]

export default function LokasiV2GPage() {
  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: '#151A2D' }}>Lokasi V2G di sekitar Anda</h1>
      <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 22px' }}>Disesuaikan dengan lokasi, ketersediaan, dan tarif kompensasi.</p>

      {/* Filter */}
      <div style={{ ...cardStyle, marginBottom: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Jarak maksimum</label>
            <select style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px' }}>
              <option>5 km</option><option>10 km</option><option>20 km</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Daya minimum</label>
            <select style={{ width: '100%', padding: '9px 10px', border: '1px solid #E4E7EE', borderRadius: '8px', fontSize: '13.5px' }}>
              <option>Semua</option><option>DC fast</option><option>AC bidirectional</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', color: '#6B7280', marginBottom: '6px' }}>Hanya V2G ready</label>
            <div style={{ display: 'flex', alignItems: 'center', height: '38px' }}>
              <div style={{ width: '38px', height: '21px', borderRadius: '100px', background: '#2F5AF7', cursor: 'pointer', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '2px', left: '19px', width: '17px', height: '17px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.2)', transition: 'transform .15s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div style={{ ...cardStyle }}>
        <div style={{ width: '100%', height: '280px', borderRadius: '10px', marginBottom: '14px', background: '#E4E7EE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#98A1B0', fontSize: '13.5px' }}>
          <MapPin size={20} style={{ marginRight: '8px' }} /> Peta lokasi V2G
        </div>

        {locations.map((loc, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < locations.length - 1 ? '1px solid #E4E7EE' : 'none', cursor: 'pointer' }}>
            <div>
              <strong style={{ fontSize: '13.5px', color: '#151A2D' }}>{loc.name}</strong>
              {loc.ready && <span style={{ marginLeft: '8px', fontSize: '11.5px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', background: '#E9F8EF', color: '#16A34A' }}>V2G ready</span>}
              <div style={{ fontSize: '12.5px', color: '#6B7280' }}>{loc.price} · {loc.connector} connector · {loc.dist}</div>
            </div>
            <button style={{ background: '#fff', border: '1px solid #E4E7EE', borderRadius: '8px', padding: '8px 14px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', color: '#151A2D' }}>Rute</button>
          </div>
        ))}
      </div>
    </div>
  )
}
