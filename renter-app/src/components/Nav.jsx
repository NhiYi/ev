import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Nav(){
  const { user, logout } = useAuth()

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">EV Renter</Link>
        <Link to="/stations">Stations</Link>
        <Link to="/history">History</Link>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="role">{user.role}</span>
            <button onClick={logout} className="btn danger">Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn primary">Login</Link>
        )}
      </div>
    </nav>
  )
}
