import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const nav = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    try{
      await api.post('/auth/register', { name, email, password })
      alert('Registered, please login')
      nav('/login')
    }catch(err){
      alert(err?.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="page container">
      <h2>Register</h2>
      <form onSubmit={submit} className="form">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="name" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
        <button className="btn primary">Register</button>
      </form>
    </div>
  )
}
