import React, { useState } from 'react'
import api from '../../utils/axiosClient'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LoginPage(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await api.post('/auth/login', { email, password })
      login(res.data)
      nav('/')
    }catch(err){ alert(err?.response?.data?.message || 'Login failed') }
  }

  return (
    <div className="auth-page">
      <form onSubmit={submit} className="auth-form">
        <h2>Admin Login</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
        <button className="btn primary">Login</button>
      </form>
    </div>
  )
}
