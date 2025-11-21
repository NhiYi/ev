import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function StationDetail(){
  const { id } = useParams()
  const [station, setStation] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(()=>{
    api.get(`/stations/${id}`)
      .then(r=>{
        setStation(r.data.station || r.data)
        setVehicles(r.data.vehicles || [])
      })
      .catch(()=>{})
  },[id])

  const book = async (vehicleId) => {
    if (!user){ navigate('/login'); return }
    try{
      await api.post('/rental/book', { vehicleId })
      alert('Booked — check history')
      navigate('/history')
    }catch(err){
      alert(err?.response?.data?.message || 'Booking failed')
    }
  }

  if (!station)
    return <div className="page container">Loading...</div>

  return (
    <div className="page container">
      <h2>{station.name}</h2>
      <p>{station.address}</p>

      <h3>Vehicles</h3>
      <div className="grid">
        {vehicles.map(v=> (
          <div key={v.id} className="card">
            <div className="card-body">
              <div>{v.model || v.name}</div>
              <div>Battery: {v.batteryLevel ?? v.battery}</div>
              <div>Status: {v.status}</div>
              <button className="btn primary" onClick={()=>book(v.id)}>Book</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
