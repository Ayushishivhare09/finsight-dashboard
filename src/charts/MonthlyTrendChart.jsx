import { motion } from 'framer-motion'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from '../context/ThemeContext.jsx'

export default function MonthlyTrendChart({ data }) {
  const { isDark } = useTheme()
  const axisColor = isDark ? '#94a3b8' : '#64748b'
  const gridColor = isDark ? '#1F2A40' : '#e2e8f0'

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-80 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#121A2B]">
      <p className="mb-2 font-medium text-gray-900 dark:text-white">Savings Trend</p>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }} />
          <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }} />
          <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${gridColor}`, background: isDark ? '#0B1220' : '#ffffff', color: isDark ? '#fff' : '#111827' }} />
          <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
