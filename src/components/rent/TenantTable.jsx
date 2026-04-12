import { inr } from '../../utils/formatters.js'

export default function TenantTable({ tenants, onEdit, onDelete }) {
  return (
    <div className="overflow-auto rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80">
      <h3 className="mb-3 font-semibold">Tenant List</h3>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800">
            <th className="py-2">Name</th>
            <th>Phone</th>
            <th>Property</th>
            <th>Monthly Rent</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id} className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2">{tenant.name}</td>
              <td>{tenant.phone}</td>
              <td>{tenant.propertyName}</td>
              <td>{inr(tenant.monthlyRent)}</td>
              <td>{tenant.rentDueDate}</td>
              <td>{tenant.status}</td>
              <td className="space-x-2">
                <button className="rounded bg-amber-500 px-2 py-1 text-white" onClick={() => onEdit(tenant)}>
                  Edit
                </button>
                <button className="rounded bg-red-600 px-2 py-1 text-white" onClick={() => onDelete(tenant.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
