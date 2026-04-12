import { inr } from '../utils/formatters.js'

export default function TransactionTable({ data, onEdit, onDelete }) {
  return (
    <div className="overflow-auto rounded-xl bg-white p-4 dark:bg-slate-900">
      <table className="w-full text-left text-sm">
        <thead><tr className="border-b"><th>Type</th><th>Amount</th><th>Category</th><th>Payment</th><th>Date</th><th>Notes</th><th>Actions</th></tr></thead>
        <tbody>
          {data.map((t) => (
            <tr key={t.id} className="border-b border-slate-100 dark:border-slate-800">
              <td>{t.type}</td><td>{inr(t.amount)}</td><td>{t.category}</td><td>{t.paymentMethod}</td><td>{t.date}</td><td>{t.notes}</td>
              <td className="space-x-2 py-2">
                <button className="rounded bg-amber-500 px-2 py-1 text-white" onClick={() => onEdit(t)}>Edit</button>
                <button className="rounded bg-red-600 px-2 py-1 text-white" onClick={() => onDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
