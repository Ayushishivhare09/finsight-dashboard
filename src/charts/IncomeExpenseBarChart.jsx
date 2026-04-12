import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from '../context/ThemeContext.jsx'

export default function IncomeExpenseBarChart({ data }) {
  const { isDark } = useTheme()
  const axisColor = isDark ? '#94a3b8' : '#64748b'
  const gridColor = isDark ? '#1F2A40' : '#e2e8f0'
  return (
    <div className="h-80 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#121A2B]">
      <p className="mb-2 font-medium text-gray-900 dark:text-white">Income vs Expenses</p>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          barCategoryGap={30}
          barGap={6}
          margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
        >
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }} />
          <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }} />
          <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${gridColor}`, background: isDark ? '#0B1220' : '#ffffff', color: isDark ? '#fff' : '#111827' }} />
          <Legend 
            wrapperStyle={{
            fontSize: "12px",
            color: axisColor,
            paddingTop: 10
            }}
          />
          <Bar dataKey="income" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={14}/>
          <Bar dataKey="expense" fill="#EF4444" radius={[6, 6, 0, 0]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
