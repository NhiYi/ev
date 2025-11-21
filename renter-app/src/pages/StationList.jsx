import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function StationList(){
  const [stations, setStations] = useState([])

  useEffect(()=>{
    api.get('/station/public')
      .then(r=>setStations(r.data))
      .catch(()=> api.get('/stations')
        .then(r=>setStations(r.data))
        .catch(()=>setStations([]))
      )
  },[])

  return (
    <div className="page container">
      <h2>Stations</h2>
      <div className="grid">
        {stations.map(s=> (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p>{s.address}</p>
            <Link to={`/stations/${s.id}`} className="btn">Open</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
