import { Bell, Moon, Sun } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function Navbar({ title }) {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <header className="mb-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#121A2B]">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">{today}</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-xl border border-gray-200 p-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 dark:border-[#1F2A40] dark:text-gray-300 dark:hover:bg-[#0B1220]">
          <Bell size={16} />
        </button>
        <button
          onClick={toggleTheme}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#0B1220] dark:text-gray-200"
        >
          <span className="flex items-center gap-2">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? 'Light mode' : 'Dark mode'}
          </span>
        </button>
        <span className="hidden rounded-xl border border-gray-200 px-3 py-2 text-xs text-gray-600 transition-colors duration-300 dark:border-[#1F2A40] dark:text-gray-300 md:inline">
          {user?.name || 'User'}
        </span>
        <button onClick={logout} className="rounded-xl border border-gray-200 px-3 py-2 text-sm transition-colors duration-300 hover:bg-gray-100 dark:border-[#1F2A40] dark:hover:bg-[#0B1220]">
          Logout
        </button>
      </div>
    </header>
  )
}
