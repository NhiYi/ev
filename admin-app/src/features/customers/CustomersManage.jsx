import React, { useEffect, useState } from 'react'
import api from '../../utils/axiosClient'

export default function CustomersManage(){
  const [list,setList] = useState([])
  useEffect(()=>{ api.get('/customers').then(r=>setList(r.data)).catch(()=>setList([])) },[])
  return (
    <div className="p-6">
      <h2>Customers</h2>
      <div className="grid">
        {list.map(c=> (
          <div key={c.id} className="card">
            <h3>{c.name}</h3>
            <p>{c.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
