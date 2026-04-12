import { useState } from 'react'
import Navbar from '../components/layout/Navbar.jsx'
import { useFinance } from '../context/FinanceContext.jsx'

export default function GoalsPage() {
  const { goals, setGoals } = useFinance()
  const [form, setForm] = useState({ name: '', target: '', saved: '' })
  return (
    <div className="space-y-4">
      <Navbar title="Savings Goals" />
      <form
        className="grid gap-2 rounded-xl bg-white p-4 dark:bg-slate-900 md:grid-cols-4"
        onSubmit={(e) => {
          e.preventDefault()
          setGoals((prev) => [...prev, { id: crypto.randomUUID(), name: form.name, target: Number(form.target), saved: Number(form.saved) }])
          setForm({ name: '', target: '', saved: '' })
        }}
      >
        <input className="rounded border p-2 dark:bg-slate-800" placeholder="Goal name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="rounded border p-2 dark:bg-slate-800" placeholder="Target amount" type="number" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} />
        <input className="rounded border p-2 dark:bg-slate-800" placeholder="Saved amount" type="number" value={form.saved} onChange={(e) => setForm({ ...form, saved: e.target.value })} />
        <button className="rounded bg-brand-600 px-3 py-2 text-white">Add Goal</button>
      </form>
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((g) => {
          const pct = (g.saved / g.target) * 100
          return (
            <article key={g.id} className="rounded-xl bg-white p-4 dark:bg-slate-900">
              <div className="mb-2 flex items-center justify-between"><strong>{g.name}</strong><span>{pct.toFixed(0)}%</span></div>
              <div className="h-2 rounded bg-slate-200"><div className="h-2 rounded bg-brand-600" style={{ width: `${Math.min(100, pct)}%` }} /></div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
