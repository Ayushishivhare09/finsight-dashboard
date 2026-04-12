export default function RentStatusBadge({ status }) {
  const classes =
    status === 'Paid'
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
      : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
  return <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold ${classes}`}>{status}</span>
}
