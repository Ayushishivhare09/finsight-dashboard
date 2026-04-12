import { CATEGORIES, PAYMENT_METHODS } from '../data/constants.js'

export default function FiltersPanel({ filters, setFilters }) {
  return (
    <div className="grid gap-2 rounded-xl bg-white p-4 dark:bg-slate-900 md:grid-cols-4">
      <input className="rounded border p-2 dark:bg-slate-800" placeholder="Search notes/tags" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
      <select className="rounded border p-2 dark:bg-slate-800" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
        <option value="">All Categories</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <select className="rounded border p-2 dark:bg-slate-800" value={filters.paymentMethod} onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}>
        <option value="">All Methods</option>{PAYMENT_METHODS.map((p) => <option key={p}>{p}</option>)}
      </select>
      <input className="rounded border p-2 dark:bg-slate-800" type="month" value={filters.month} onChange={(e) => setFilters({ ...filters, month: e.target.value })} />
      <input className="rounded border p-2 dark:bg-slate-800" placeholder="Min amount" type="number" value={filters.minAmount} onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })} />
      <input className="rounded border p-2 dark:bg-slate-800" placeholder="Max amount" type="number" value={filters.maxAmount} onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })} />
      <input className="rounded border p-2 dark:bg-slate-800" type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
      <input className="rounded border p-2 dark:bg-slate-800" type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
      <select className="rounded border p-2 dark:bg-slate-800" value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
        <option value="newest">Newest</option><option value="oldest">Oldest</option><option value="highest">Highest</option><option value="lowest">Lowest</option>
      </select>
    </div>
  )
}
