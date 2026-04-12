import { motion } from 'framer-motion'
import { inr } from '../utils/formatters.js'

export default function StatCards({ totals, monthlyBudget }) {
  const balance = totals.income - totals.expense
  const savingsRate = totals.income ? ((balance / totals.income) * 100).toFixed(1) : 0
  const budgetUsage = monthlyBudget ? ((totals.expense / monthlyBudget) * 100).toFixed(1) : 0
  const cards = [
    { title: 'Total Balance', value: inr(balance) ,  icon: '💰', color: '#34d399'},
    { title: 'Monthly Income', value: inr(totals.income), icon: '📈', color: '#10b981' },
    { title: 'Monthly Expenses', value: inr(totals.expense), icon: '📉', color: '#ef4444' },
    { title: 'Savings Rate', value: `${savingsRate}%`, icon: '📊', color: '#f59e0b' },
    { title: 'Budget Usage', value: `${budgetUsage}%`, icon: '📊', color: '#f59e0b' },
  ]
  const accent = ['text-blue-400 dark:text-white', 'text-emerald-400', 'text-rose-400', 'text-amber-400']
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c, idx) => (
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          key={c.title}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-[#1F2A40] dark:bg-[#121A2B]"
        >
          <div className="flex items-center justify-between">
           <p className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
             {c.title}
            </p>

            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-lg"
              style={{ backgroundColor: `${c.color}20`, color: c.color }}
            >
              {c.icon}
             </span>
          </div>
          <p className={`mt-2 text-3xl font-bold ${accent[idx]}`}>{c.value}</p>
        </motion.article>
      ))}
    </section>
  )
}
