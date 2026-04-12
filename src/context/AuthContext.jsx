import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('finsight.auth.users', [])
  const [session, setSession] = useLocalStorage('finsight.auth.session', null)

  const value = useMemo(
    () => ({
      user: session,
      isAuthenticated: Boolean(session),
      signup: ({ name, email, password }) => {
        const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
        if (existing) return { ok: false, message: 'Email already registered.' }
        const newUser = { id: crypto.randomUUID(), name, email, password }
        setUsers((prev) => [...prev, newUser])
        setSession({ id: newUser.id, name: newUser.name, email: newUser.email })
        return { ok: true }
      },
      login: ({ email, password }) => {
        const existing = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
        )
        if (!existing) return { ok: false, message: 'Invalid email or password.' }
        setSession({ id: existing.id, name: existing.name, email: existing.email })
        return { ok: true }
      },
      logout: () => setSession(null),
    }),
    [session, users, setSession, setUsers],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
