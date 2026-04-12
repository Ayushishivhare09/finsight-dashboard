import Navbar from '../components/layout/Navbar.jsx'
import StatCards from '../components/StatCards.jsx'
import MonthlyTrendChart from '../charts/MonthlyTrendChart.jsx'
import CategoryPieChart from '../charts/CategoryPieChart.jsx'
import IncomeExpenseBarChart from '../charts/IncomeExpenseBarChart.jsx'
import DailyHeatmap from '../components/DailyHeatmap.jsx'
import { motion } from 'framer-motion'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useFinance } from '../context/FinanceContext.jsx'
import { buildExpenseHeatmap, categoryExpenses, detectSubscriptions, financeScore, monthlyTrend } from '../utils/analytics.js'
import { inr } from '../utils/formatters.js'
import { CATEGORIES } from '../data/constants.js'

export default function DashboardPage() {
  const { transactions, monthlyTransactions, totals, budgets } = useFinance()
  const balance = totals.income - totals.expense
  const savingsRate = totals.income ? (balance / totals.income) * 100 : 0
  const budgetUsage = budgets.monthlyBudget ? (totals.expense / budgets.monthlyBudget) * 100 : 0
  const subs = detectSubscriptions(monthlyTransactions)
  const score = financeScore({ savingsRate, budgetUsage })
  const predicted = (totals.expense / new Date().getDate()) * 30
  const heatmap = buildExpenseHeatmap(monthlyTransactions)
  const upiMonthly = monthlyTransactions.filter((t) => t.paymentMethod === 'UPI')
  const upiIncome = upiMonthly
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0)
  const upiExpense = upiMonthly
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0)
  const trend = monthlyTrend(transactions)
  const savingsTrend = trend.map((item) => ({ month: item.month, savings: item.income - item.expense }))
  const expenseByCategory = Object.fromEntries(
    CATEGORIES.map((category) => [
      category,
      monthlyTransactions
        .filter((transaction) => transaction.type === 'expense' && transaction.category === category)
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0),
    ]),
  )
  const budgetRows = ['Food', 'Rent', 'Transport', 'Health'].map((category) => {
    const spent = expenseByCategory[category] || 0
    const limit = budgets.categoryBudgets?.[category] || 1
    const percent = Math.min(100, (spent / limit) * 100)
    return { category, spent, limit, percent }
  })
  const healthCircumference = 2 * Math.PI * 46
  const healthOffset = healthCircumference - (score / 100) * healthCircumference

  return (
    <div className="space-y-6">
      <Navbar title="Dashboard" />
      <StatCards totals={totals} monthlyBudget={budgets.monthlyBudget} />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#121A2B]">
          Finance Score: <strong className="text-emerald-400">{score} / 100</strong>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#121A2B]">
          Predicted Month-End Spend: <strong className="text-amber-400">{inr(predicted)}</strong>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#121A2B]">
          Subscriptions: <strong className="text-fuchsia-400">{inr(subs.monthlyCost)}</strong>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#121A2B]">
        <p className="mb-3 font-semibold">UPI Income & Expense (This Month)</p>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-gray-100 p-3 dark:bg-[#0B1220]">
            <p className="text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">UPI Income</p>
            <p className="text-xl font-bold text-emerald-400">{inr(upiIncome)}</p>
          </div>
          <div className="rounded-xl bg-gray-100 p-3 dark:bg-[#0B1220]">
            <p className="text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">UPI Expense</p>
            <p className="text-xl font-bold text-rose-400">{inr(upiExpense)}</p>
          </div>
          <div className="rounded-xl bg-gray-100 p-3 dark:bg-[#0B1220]">
            <p className="text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">UPI Net</p>
            <p className={`text-xl font-bold ${upiIncome - upiExpense >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {inr(upiIncome - upiExpense)}
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <MonthlyTrendChart data={trend} />
        <CategoryPieChart data={categoryExpenses(monthlyTransactions)} />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <IncomeExpenseBarChart data={trend} />
        </div>
        <div className="h-80 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#121A2B]">
          <p className="mb-3 font-semibold text-gray-900 dark:text-white">Savings Trend</p>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={savingsTrend}>
              <defs>
                <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="savings" stroke="#10B981" fill="url(#savingsGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#121A2B]">
          <p className="mb-4 font-semibold text-gray-900 dark:text-white">Budget Overview</p>
          <div className="space-y-5">
            {budgetRows.map((row) => (
              <div key={row.category}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-200">{row.category}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {inr(row.spent)} / {inr(row.limit)}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-gray-200 dark:bg-[#0B1220]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${row.percent}%` }}
                    transition={{ duration: 0.7 }}
                    className={`h-3 rounded-full ${row.percent >= 80 ? 'bg-red-500' : 'bg-emerald-500'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#121A2B]">
          <p className="mb-4 font-semibold text-gray-900 dark:text-white">Financial Health Score</p>
          <div className="flex flex-col items-center">
            <svg width="120" height="120" className="-rotate-90">
              <circle cx="60" cy="60" r="46" stroke="#1F2A40" strokeWidth="10" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="46"
                stroke="#10B981"
                strokeWidth="10"
                fill="none"
                strokeDasharray={healthCircumference}
                strokeDashoffset={healthOffset}
                strokeLinecap="round"
              />
            </svg>
            <p className="-mt-16 text-2xl font-bold text-emerald-400">{score}</p>
            <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
              {score >= 80 ? 'Excellent financial discipline. Keep it up.' : 'Improve savings and budget balance for a better score.'}
            </p>
          </div>
        </div>
      </div>
      <DailyHeatmap weeks={heatmap} />
    </div>
  )
}
