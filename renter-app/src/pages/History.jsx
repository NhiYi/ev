import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function History(){
  const [items, setItems] = useState([])

  useEffect(()=>{
    api.get('/rental/history')
      .then(r=>setItems(r.data))
      .catch(()=>setItems([]))
  },[])

  return (
    <div className="page container">
      <h2>Your Rentals</h2>

      {items.length === 0 ? (
        <div>No rentals</div>
      ) : (
        <ul>
          {items.map(it=> (
            <li key={it.id} className="card">
              {it.vehicleName} — {it.startAt} — {it.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
