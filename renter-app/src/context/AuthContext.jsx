import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    try { 
      return JSON.parse(localStorage.getItem('renter_user')) 
    } catch(e){ 
      return null 
    }
  })

  const login = (payload) => {
    localStorage.setItem('renter_user', JSON.stringify(payload))
    setUser(payload)
  }

  const logout = () => {
    localStorage.removeItem('renter_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
