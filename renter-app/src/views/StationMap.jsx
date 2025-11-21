import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import api from '../services/api'

export default function StationMap(){
  const [stations, setStations] = useState([])

  useEffect(()=>{
    api.get('/station/public')
      .then(r=>setStations(r.data))
      .catch(()=> api.get('/stations')
        .then(r=>setStations(r.data))
        .catch(()=>setStations([]))
      )
  },[])

  const center = [10.762622, 106.660172]

  return (
    <div className="map-wrap">
      <MapContainer center={center} zoom={13} style={{height:'60vh'}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {stations.map(s=> (
          <Marker
            key={s.id}
            position={[s.latitude || center[0], s.longitude || center[1]]}
          >
            <Popup>
              <strong>{s.name}</strong>
              <div>
                <a href={`/stations/${s.id}`}>View</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
