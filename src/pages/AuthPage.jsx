import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function AuthPage() {
  const { isAuthenticated, login, signup } = useAuth()
  const location = useLocation()
  const [mode, setMode] = useState(() => (location.state?.mode === 'signup' ? 'signup' : 'login'))
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  useEffect(() => {
    if (location.state?.mode === 'login' || location.state?.mode === 'signup') {
      setMode(location.state.mode)
      setError('')
    }
  }, [location.state?.mode])

  if (isAuthenticated) return <Navigate to={location.state?.from || '/dashboard'} replace />

  const submit = (e) => {
    e.preventDefault()
    const result =
      mode === 'login'
        ? login({ email: form.email, password: form.password })
        : signup({ name: form.name, email: form.email, password: form.password })
    if (!result.ok) setError(result.message)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 dark:bg-[#070f26]">
      <form onSubmit={submit} className="w-full max-w-md space-y-3 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-1 pb-2">
          <h1 className="text-2xl font-bold text-brand-500">Manage Your Finances Smarter 💰</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Track, analyze, and optimize your spending in one place.</p>
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        {mode === 'signup' ? (
          <input className="w-full rounded border p-2 dark:bg-slate-800" placeholder="Full name" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
        ) : null}
        <input className="w-full rounded border p-2 dark:bg-slate-800" type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
        <input className="w-full rounded border p-2 dark:bg-slate-800" type="password" placeholder="Password" required value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
        {error ? <p className="text-sm text-rose-500">{error}</p> : null}
        <button className="w-full rounded bg-brand-600 px-4 py-2 text-white" type="submit">
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
        <button
          type="button"
          className="w-full rounded border px-4 py-2"
          onClick={() => {
            setMode((m) => (m === 'login' ? 'signup' : 'login'))
            setError('')
          }}
        >
          {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  )
}
