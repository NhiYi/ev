import React, { useState } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try{
      const resp = await api.post('/auth/login', { email, password })
      login(resp.data)
      nav('/')
    }catch(err){
      alert(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="page container">
      <h2>Login</h2>
      <form onSubmit={submit} className="form">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
        <div className="actions">
          <button className="btn primary">Login</button>
          <Link to="/register" className="btn">Register</Link>
        </div>
      </form>
    </div>
  )
}
