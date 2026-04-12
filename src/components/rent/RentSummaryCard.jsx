import { inr } from '../../utils/formatters.js'

export default function RentSummaryCard({ tenants, rentPayments }) {
  const activeTenants = tenants.filter((tenant) => tenant.status === 'Active').length
  const totalRentExpected = rentPayments.reduce((sum, payment) => sum + Number(payment.rentAmount), 0)
  const rentCollected = rentPayments
    .filter((payment) => payment.status === 'Paid')
    .reduce((sum, payment) => sum + Number(payment.rentAmount), 0)
  const pendingRent = totalRentExpected - rentCollected

  return (
    <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80 md:grid-cols-4">
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Total Rent Expected</p>
        <p className="text-2xl font-bold text-sky-400">{inr(totalRentExpected)}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Rent Collected</p>
        <p className="text-2xl font-bold text-emerald-400">{inr(rentCollected)}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Pending Rent</p>
        <p className="text-2xl font-bold text-rose-400">{inr(pendingRent)}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Number of Tenants</p>
        <p className="text-2xl font-bold text-violet-400">{activeTenants}</p>
      </div>
    </section>
  )
}
