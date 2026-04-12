import { BarChart3, Building2, FileText, Goal, LayoutDashboard, PiggyBank, Settings, Wallet } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: Wallet },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/budgets', label: 'Budgets', icon: PiggyBank },
  { to: '/goals', label: 'Goals', icon: Goal },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/rent', label: 'Rent Manager', icon: Building2 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="w-full border-b border-gray-200 bg-white p-4 transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#0F172A] lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <h1 className="mb-1 text-2xl font-bold tracking-tight text-teal-500">FinSight</h1>
      <p className="mb-6 text-xs uppercase tracking-[0.28em] text-gray-500">Personal Finance</p>
      <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors duration-300 ${
                isActive
                  ? 'bg-teal-500/10 font-semibold text-teal-400 shadow-[inset_0_0_0_1px_rgba(45,212,191,0.35)]'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#121A2B]'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
