import React, { useEffect, useState } from 'react'
import api from '../../utils/axiosClient'
import { Bar, Line } from 'react-chartjs-2'

export default function DashboardPage(){
  const [data, setData] = useState(null)
  useEffect(()=>{ api.get('/analytics/admin-summary').then(r=>setData(r.data)).catch(()=>setData(null)) },[])

  if (!data) return <div className="p-4">Loading...</div>

  const revenueData = { labels: data.revenue.labels, datasets: [{ label: 'Revenue', data: data.revenue.values }] }
  const usageData = { labels: data.usage.labels, datasets: [{ label: 'Usage', data: data.usage.values }] }

  return (
    <div className="dashboard container">
      <h1>Admin Dashboard</h1>
      <div className="grid">
        <div className="card">Total Revenue: {data.totals.revenue}</div>
        <div className="card">Total Rentals: {data.totals.rentals}</div>
        <div className="card">Active Vehicles: {data.totals.activeVehicles}</div>
      </div>

      <div className="charts">
        <div className="chart card"><Bar data={revenueData} /></div>
        <div className="chart card"><Line data={usageData} /></div>
      </div>
    </div>
  )
}
