import { useAuth } from '../context/AuthContext.jsx'

export default function TopNavbar({ title }) {
  const { user, logout } = useAuth()
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  return (
    <header className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{today}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden rounded-lg border border-slate-200 px-3 py-2 text-xs dark:border-slate-700 md:inline">{user?.name || 'User'}</span>
        <button onClick={logout} className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">Logout</button>
      </div>
    </header>
  )
}
