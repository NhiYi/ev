import React, { useEffect, useState } from 'react'
import api from '../../utils/axiosClient'

export default function StationsManage(){
  const [list,setList] = useState([])
  useEffect(()=>{ api.get('/stations').then(r=>setList(r.data)).catch(()=>setList([])) },[])
  return (
    <div className="p-6">
      <h2>Stations</h2>
      <div className="grid">
        {list.map(s=> (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p>{s.address}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
