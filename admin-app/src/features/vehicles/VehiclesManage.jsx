import React, { useEffect, useState } from 'react'
import api from '../../utils/axiosClient'

export default function VehiclesManage(){
  const [list,setList] = useState([])
  useEffect(()=>{ api.get('/vehicles').then(r=>setList(r.data)).catch(()=>setList([])) },[])
  return (
    <div className="p-6">
      <h2>Vehicles</h2>
      <div className="grid">
        {list.map(v=> (
          <div key={v.id} className="card">
            <h3>{v.model}</h3>
            <p>Battery: {v.battery}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
