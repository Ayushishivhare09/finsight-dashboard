import { Bell, Menu, Moon, Sun, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar({ title }) {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/transactions', label: 'Transactions' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/budgets', label: 'Budgets' },
    { to: '/goals', label: 'Goals' },
    { to: '/reports', label: 'Reports' },
    { to: '/rent', label: 'Rent' },
    { to: '/settings', label: 'Settings' },
  ]

  return (
    <header className="mb-6 space-y-3 rounded-2xl border border-gray-200 bg-white p-4 transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#121A2B]">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">{today}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile navigation toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-xl border border-gray-200 p-2 text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:border-[#1F2A40] dark:text-gray-200 dark:hover:bg-[#0B1220] md:hidden"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotifOpen((prev) => !prev)}
              className="rounded-xl border border-gray-200 p-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 dark:border-[#1F2A40] dark:text-gray-300 dark:hover:bg-[#0B1220]"
              aria-label="Notifications"
              aria-expanded={isNotifOpen}
            >
              <Bell size={16} />
            </button>
            {isNotifOpen ? (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-3 text-sm text-gray-700 shadow-xl dark:border-[#1F2A40] dark:bg-[#0B1220] dark:text-gray-200">
                <p className="font-semibold">Notifications</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">No notifications yet.</p>
                <button
                  type="button"
                  onClick={() => setIsNotifOpen(false)}
                  className="mt-3 w-full rounded-xl border border-gray-200 px-3 py-2 text-xs hover:bg-gray-100 dark:border-[#1F2A40] dark:hover:bg-[#121A2B]"
                >
                  Close
                </button>
              </div>
            ) : null}
          </div>

          {/* Theme */}
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:border-[#1F2A40] dark:bg-[#0B1220] dark:text-gray-200 dark:hover:bg-[#121A2B]"
          >
            <span className="flex items-center gap-2">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden sm:inline">{isDark ? 'Light mode' : 'Dark mode'}</span>
            </span>
          </button>

          <span className="hidden rounded-xl border border-gray-200 px-3 py-2 text-xs text-gray-600 transition-colors duration-300 dark:border-[#1F2A40] dark:text-gray-300 md:inline">
            {user?.name || 'User'}
          </span>

          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm transition-colors duration-300 hover:bg-gray-100 dark:border-[#1F2A40] dark:hover:bg-[#0B1220]"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden flex-wrap gap-2 md:flex">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-xl border px-3 py-2 text-sm transition-colors duration-200 ${
                isActive
                  ? 'border-teal-500/40 bg-teal-500/10 text-teal-500 dark:text-teal-300'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-[#1F2A40] dark:text-gray-200 dark:hover:bg-[#0B1220]'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Mobile nav */}
      {isMenuOpen ? (
        <nav className="grid gap-2 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-xl border px-3 py-2 text-sm transition-colors duration-200 ${
                  isActive
                    ? 'border-teal-500/40 bg-teal-500/10 text-teal-500 dark:text-teal-300'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-[#1F2A40] dark:text-gray-200 dark:hover:bg-[#0B1220]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
