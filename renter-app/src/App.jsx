import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import StationList from './pages/StationList'
import StationDetail from './pages/StationDetail'
import History from './pages/History'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthContext'

export default function App(){
  return (
    <AuthProvider>
      <div className="app-root">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/stations" element={<StationList/>} />
            <Route path="/stations/:id" element={<StationDetail/>} />
            <Route path="/history" element={<History/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}
