import { inr } from '../../utils/formatters.js'

export default function RentPaymentModal({ payment, onClose, onConfirm }) {
  if (!payment) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-semibold">Confirm Rent Payment</h3>
        <p className="mt-2 text-sm text-slate-500">
          Mark rent as paid for <strong>{payment.tenantName}</strong> ({payment.month}) - {inr(payment.rentAmount)}
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded border px-3 py-2" onClick={onClose}>
            Cancel
          </button>
          <button
            className="rounded bg-emerald-600 px-3 py-2 text-white"
            onClick={() => {
              onConfirm(payment.id)
              onClose()
            }}
          >
            Mark as Paid
          </button>
        </div>
      </div>
    </div>
  )
}
