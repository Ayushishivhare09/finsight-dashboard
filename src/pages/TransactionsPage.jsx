import { useMemo, useState } from 'react'
import FiltersPanel from '../components/FiltersPanel.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import TransactionForm from '../components/TransactionForm.jsx'
import TransactionTable from '../components/TransactionTable.jsx'
import { useFinance } from '../context/FinanceContext.jsx'
import { inr } from '../utils/formatters.js'

export default function TransactionsPage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useFinance()
  const [editing, setEditing] = useState(null)
  const [filters, setFilters] = useState({
    search: '', category: '', paymentMethod: '', month: '', minAmount: '', maxAmount: '', startDate: '', endDate: '', sort: 'newest',
  })
  const filtered = useMemo(() => {
    let rows = [...transactions].filter(
      (t) =>
        (!filters.category || t.category === filters.category) &&
        (!filters.paymentMethod || t.paymentMethod === filters.paymentMethod) &&
        (!filters.month || t.date.startsWith(filters.month)) &&
        (!filters.startDate || t.date >= filters.startDate) &&
        (!filters.endDate || t.date <= filters.endDate) &&
        (!filters.minAmount || t.amount >= Number(filters.minAmount)) &&
        (!filters.maxAmount || t.amount <= Number(filters.maxAmount)) &&
        (`${t.notes} ${t.tags?.join(' ')}`.toLowerCase().includes(filters.search.toLowerCase())),
    )
    const sorters = {
      newest: (a, b) => b.date.localeCompare(a.date),
      oldest: (a, b) => a.date.localeCompare(b.date),
      highest: (a, b) => b.amount - a.amount,
      lowest: (a, b) => a.amount - b.amount,
    }
    rows.sort(sorters[filters.sort])
    return rows
  }, [transactions, filters])

  const upiRows = useMemo(
    () => filtered.filter((transaction) => transaction.paymentMethod === 'UPI'),
    [filtered],
  )
  const upiIncome = useMemo(
    () =>
      upiRows
        .filter((transaction) => transaction.type === 'income')
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0),
    [upiRows],
  )
  const upiExpense = useMemo(
    () =>
      upiRows
        .filter((transaction) => transaction.type === 'expense')
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0),
    [upiRows],
  )

  return (
    <div className="space-y-4">
      <Navbar title="Transactions" />
      <TransactionForm
        initial={editing ? { ...editing, tags: editing.tags.join(', ') } : null}
        onCancel={() => setEditing(null)}
        onSubmit={(payload) => {
          if (editing) updateTransaction(editing.id, payload)
          else addTransaction(payload)
          setEditing(null)
        }}
      />
      <FiltersPanel filters={filters} setFilters={setFilters} />
      <TransactionTable data={filtered} onEdit={setEditing} onDelete={deleteTransaction} />
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80">
        <h3 className="font-semibold">UPI Income & Expense</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800/70">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">UPI Income</p>
            <p className="text-xl font-bold text-emerald-400">{inr(upiIncome)}</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800/70">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">UPI Expense</p>
            <p className="text-xl font-bold text-rose-400">{inr(upiExpense)}</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800/70">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">UPI Net</p>
            <p className={`text-xl font-bold ${upiIncome - upiExpense >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {inr(upiIncome - upiExpense)}
            </p>
          </div>
        </div>
        <TransactionTable data={upiRows} onEdit={setEditing} onDelete={deleteTransaction} />
      </section>
    </div>
  )
}
