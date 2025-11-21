import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TopNav() {
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/">Staff</Link>
        <Link to="/stations">Stations</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span>{user.name || user.email}</span>
            <button onClick={logout} className="btn danger">Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </nav>
  );
}
