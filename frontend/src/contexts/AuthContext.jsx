import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const USERS = {
  admin: { password: 'sigerak123', role: 'pengelola', name: 'Administrator' },
  operator: { password: 'sigerak123', role: 'pengelola', name: 'Operator' },
  user1: { password: 'user123', role: 'pengguna', name: 'Pengguna 1' },
  user2: { password: 'user123', role: 'pengguna', name: 'Pengguna 2' },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('sigerak_user')
    if (saved) {
      try { setUser(JSON.parse(saved)) } catch {}
    }
    setLoading(false)
  }, [])

  const login = (username, password) => {
    const found = USERS[username]
    if (found && found.password === password) {
      const userData = { username, role: found.role, name: found.name }
      setUser(userData)
      localStorage.setItem('sigerak_user', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: 'Username atau password salah' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sigerak_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
