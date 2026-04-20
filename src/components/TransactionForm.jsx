import { useState, useEffect } from 'react'
import { CATEGORIES, PAYMENT_METHODS } from '../data/constants.js'

const base = {
  type: 'expense',
  amount: '',
  category: 'Food',
  paymentMethod: 'UPI',
  date: new Date().toISOString().slice(0, 10),
  notes: '',
  tags: '',
}

export default function TransactionForm({ onSubmit, initial, onCancel }) {
  const [form, setForm] = useState(initial || base)

  useEffect(() => {
    setForm(initial || base)
  }, [initial])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...form, amount: Number(form.amount), tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) })
    setForm(base)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2 rounded-xl bg-white p-4 dark:bg-slate-900 md:grid-cols-3">
      <select className="rounded border p-2 dark:bg-slate-800" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option value="expense">Expense</option><option value="income">Income</option>
      </select>
      <input className="rounded border p-2 dark:bg-slate-800" required type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
      <select className="rounded border p-2 dark:bg-slate-800" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <select className="rounded border p-2 dark:bg-slate-800" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
        {PAYMENT_METHODS.map((p) => <option key={p}>{p}</option>)}
      </select>
      <input className="rounded border p-2 dark:bg-slate-800" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <input className="rounded border p-2 dark:bg-slate-800" placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
      <input className="rounded border p-2 dark:bg-slate-800 md:col-span-2" placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <div className="flex gap-2">
        <button className="rounded bg-brand-600 px-4 py-2 text-white" type="submit">{initial ? 'Update' : 'Add'} Transaction</button>
        {onCancel ? <button type="button" className="rounded border px-3 py-2" onClick={onCancel}>Cancel</button> : null}
      </div>
    </form>
  )
}
