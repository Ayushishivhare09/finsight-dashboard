import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-[#0B1220] dark:text-white lg:flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}
