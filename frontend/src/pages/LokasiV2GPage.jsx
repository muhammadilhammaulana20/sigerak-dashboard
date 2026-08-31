import { useState, useEffect, useRef } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const locations = [
  { name: 'Stasiun Wonokromo', price: 'Rp 2.000/kWh', connector: '4/6', ready: true, dist: '350 m', power: 'DC Fast', lat: -7.30188, lng: 112.73909 },
  { name: 'SPKLU Royal Plaza', price: 'Rp 1.900/kWh', connector: '2/4', ready: false, dist: '1.2 km', power: 'AC Bidirectional', lat: -7.30893, lng: 112.73463 },
  { name: 'PLN UP3 Surabaya Selatan', price: 'Rp 2.200/kWh', connector: '1/2', ready: false, dist: '2.5 km', power: 'DC Fast', lat: -7.28915, lng: 112.75022 },
  { name: 'ITS Charging Hub', price: 'Rp 1.800/kWh', connector: '3/6', ready: true, dist: '3.1 km', power: 'AC Bidirectional', lat: -7.28025, lng: 112.79322 },
]

const userLoc = { lat: -7.30188, lng: 112.73909 }

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function LokasiV2GPage() {
  const [readyOnly, setReadyOnly] = useState(true)
  const [selectedIdx, setSelectedIdx] = useState(null)
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markers = useRef([])

  const filteredLocations = readyOnly ? locations.filter(l => l.ready) : locations

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    const map = L.map(mapRef.current, { zoomControl: false }).setView([userLoc.lat, userLoc.lng], 13)
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map)

    // User marker
    const userIcon = L.divIcon({
      className: '',
      html: '<div style="width:14px;height:14px;border-radius:50%;background:#2F5AF7;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    })
    L.marker([userLoc.lat, userLoc.lng], { icon: userIcon }).addTo(map).bindPopup('Lokasi Anda')

    // Location markers
    locations.forEach((loc, i) => {
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:28px;height:28px;border-radius:8px;background:${loc.ready ? '#16A34A' : '#98A1B0'};display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.2)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      })
      const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map).bindPopup(`<b>${loc.name}</b><br>${loc.price}<br>${loc.connector} connector`)
      markers.current.push(marker)
    })

    mapInstance.current = map

    return () => { map.remove(); mapInstance.current = null }
  }, [])

  useEffect(() => {
    if (!mapInstance.current) return
    markers.current.forEach((m, i) => {
      if (filteredLocations.includes(locations[i])) {
        m.setOpacity(1)
      } else {
        m.setOpacity(0.2)
      }
    })
  }, [filteredLocations])

  const handleRoute = async (loc) => {
    if (!mapInstance.current) return
    const map = mapInstance.current

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${userLoc.lng},${userLoc.lat};${loc.lng},${loc.lat}?overview=full&geometries=geojson`
      const res = await fetch(url)
      const data = await res.json()
      if (data.routes && data.routes[0]) {
        const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]])
        const routeLine = L.polyline(coords, { color: '#2F5AF7', weight: 5, opacity: 0.8 }).addTo(map)
        map.fitBounds(routeLine.getBounds(), { padding: [30, 30] })

        setTimeout(() => { map.removeLayer(routeLine) }, 10000)
      }
    } catch (e) {
      const routeLine = L.polyline([[userLoc.lat, userLoc.lng], [loc.lat, loc.lng]], { color: '#2F5AF7', weight: 4, dashArray: '8 8' }).addTo(map)
      map.fitBounds(routeLine.getBounds(), { padding: [30, 30] })
      setTimeout(() => { map.removeLayer(routeLine) }, 10000)
    }
  }

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
        <div ref={mapRef} style={{ width: '100%', height: '300px', background: '#E8F4FD' }} />

        <div style={{ padding: '4px 0' }}>
          {filteredLocations.map((loc, i) => {
            const d = haversine(userLoc.lat, userLoc.lng, loc.lat, loc.lng)
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < filteredLocations.length - 1 ? '1px solid #F1F3F5' : 'none', gap: '10px', background: selectedIdx === i ? '#F9FAFB' : 'transparent' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: loc.ready ? '#E9F8EF' : '#F1F3F5', flexShrink: 0 }}>
                    <MapPin size={16} style={{ color: loc.ready ? '#16A34A' : '#98A1B0' }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '13px', color: '#151A2D' }}>{loc.name}</strong>
                      {loc.ready && <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '100px', background: '#E9F8EF', color: '#16A34A' }}>Ready</span>}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '2px' }}>{loc.price} &middot; {loc.connector} &middot; &plusmn;{d.toFixed(1)} km</div>
                  </div>
                </div>
                <button onClick={() => { setSelectedIdx(i); handleRoute(loc) }} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#fff', border: '1px solid #E4E7EE', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#151A2D', flexShrink: 0 }}>
                  <Navigation size={12} /> Rute
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
