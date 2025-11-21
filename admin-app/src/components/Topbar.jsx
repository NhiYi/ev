import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Topbar(){
  const { user, logout } = useAuth()
  return (
    <header className="topbar">
      <div className="search">Search...</div>
      <div className="actions">
        <span>{user?.name || user?.email}</span>
        <button onClick={logout} className="btn">Logout</button>
      </div>
    </header>
  )
}
