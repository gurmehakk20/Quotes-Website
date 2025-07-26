import { createContext, useState, useEffect } from 'react'
import api from '../Utils/axios' 

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')

    // Initialize from localStorage only if both user and token exist
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
        
        if (storedToken && storedUser) {
            try {
                setToken(storedToken)
                setUser(JSON.parse(storedUser))
            } catch (error) {
                console.log('Invalid stored user data, clearing localStorage')
                localStorage.clear()
                setUser(null)
                setToken('')
            }
        } else {
            // Clear any stale data
            localStorage.clear()
            setUser(null)
            setToken('')
        }
    }, [])

    // ✅ Auto-fetch user if token exists
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await api.get('/auth/me') // backend checks token
          setUser(res.data.user)
          localStorage.setItem('user', JSON.stringify(res.data.user)) // update stored user
        } catch (err) {
          console.log('Token validation failed, logging out user')
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