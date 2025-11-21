import React, { useEffect, useState } from 'react'
import api from '../../utils/axiosClient'
import { Bar } from 'react-chartjs-2'

export default function ReportsPage(){
  const [data,setData] = useState(null)
  useEffect(()=>{ api.get('/analytics/reports').then(r=>setData(r.data)).catch(()=>setData(null)) },[])
  if(!data) return <div className="p-4">Loading...</div>
  const chart = { labels:data.labels, datasets:[{ label:'Metric', data:data.values }] }
  return (
    <div className="p-6">
      <h2>Reports</h2>
      <div className="card"><Bar data={chart} /></div>
    </div>
  )
}
