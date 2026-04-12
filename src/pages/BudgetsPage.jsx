import Navbar from '../components/layout/Navbar.jsx'
import { CATEGORIES } from '../data/constants.js'
import { useFinance } from '../context/FinanceContext.jsx'

export default function BudgetsPage() {
  const { budgets, setBudgets, monthlyTransactions } = useFinance()
  const expenses = monthlyTransactions.filter((t) => t.type === 'expense')
  const spendByCat = Object.fromEntries(
    CATEGORIES.map((c) => [c, expenses.filter((t) => t.category === c).reduce((s, t) => s + t.amount, 0)]),
  )

  return (
    <div className="space-y-4">
      <Navbar title="Budgets" />
      <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
        <label className="text-sm">Monthly Budget</label>
        <input type="number" className="ml-3 rounded border p-2 dark:bg-slate-800" value={budgets.monthlyBudget} onChange={(e) => setBudgets({ ...budgets, monthlyBudget: Number(e.target.value) })} />
      </div>
      <div className="grid gap-3">
        {CATEGORIES.map((c) => {
          const usage = budgets.categoryBudgets[c] ? (spendByCat[c] / budgets.categoryBudgets[c]) * 100 : 0
          return (
            <div key={c} className="rounded-xl bg-white p-4 dark:bg-slate-900">
              <div className="mb-2 flex items-center justify-between"><strong>{c}</strong><span>{usage.toFixed(0)}%</span></div>
              <input type="number" className="mb-2 rounded border p-2 dark:bg-slate-800" value={budgets.categoryBudgets[c] || 0} onChange={(e) => setBudgets({ ...budgets, categoryBudgets: { ...budgets.categoryBudgets, [c]: Number(e.target.value) } })} />
              <div className="h-2 rounded bg-slate-200"><div className={`h-2 rounded ${usage >= 80 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, usage)}%` }} /></div>
              {usage >= 80 ? <p className="mt-2 text-sm text-red-500">You have used {usage.toFixed(0)}% of your {c} budget</p> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
