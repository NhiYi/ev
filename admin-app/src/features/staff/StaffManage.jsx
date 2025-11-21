import React, { useEffect, useState } from 'react'
import api from '../../utils/axiosClient'

export default function StaffManage(){
  const [list,setList] = useState([])
  useEffect(()=>{ api.get('/staff').then(r=>setList(r.data)).catch(()=>setList([])) },[])
  return (
    <div className="p-6">
      <h2>Staff</h2>
      <div className="grid">
        {list.map(s=> (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p>{s.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
