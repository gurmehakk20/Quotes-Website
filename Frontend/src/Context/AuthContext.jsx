import { createContext, useState, useEffect } from 'react'
import api from '../Utils/axios' 

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null)
    const [token, setToken] = useState(() => localStorage.getItem('token') || '')

    // ✅ Auto-fetch user if token exists
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await api.get('/auth/me') // backend checks token
          setUser(res.data.user)
          localStorage.setItem('user', JSON.stringify(res.data.user)) // update stored user
        } catch (err) {
          logout() // invalid token = auto logout
        }
      }

      if (token && !user) {
        fetchUser()
      }
    }, [token])

    
    const login = (data) => {
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
    }

    const logout = () => {
        setUser(null)
        setToken('')
        localStorage.clear()
    }

    return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )

}