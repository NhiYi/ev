import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <div className="logo">
        {/* use local uploaded logo path */}
        <img src="/mnt/data/106d5889-9a3d-4c43-b9e0-2cefddcf78df.png" alt="logo" style={{width:140}} />
      </div>
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/stations">Stations</NavLink>
        <NavLink to="/vehicles">Vehicles</NavLink>
        <NavLink to="/staff">Staff</NavLink>
        <NavLink to="/customers">Customers</NavLink>
        <NavLink to="/reports">Reports</NavLink>
      </nav>
    </aside>
  )
}
