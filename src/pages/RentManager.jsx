import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Navbar from '../components/layout/Navbar.jsx'
import RentStatusBadge from '../components/rent/RentStatusBadge.jsx'
import RentSummaryCard from '../components/rent/RentSummaryCard.jsx'
import TenantTable from '../components/rent/TenantTable.jsx'
import { useRent } from '../context/RentContext.jsx'
import { inr } from '../utils/formatters.js'

const defaultForm = {
  name: '',
  phone: '',
  propertyName: '',
  monthlyRent: '',
  rentDueDate: '05',
  status: 'Active',
}

export default function RentManager() {
  const {
    tenants,
    rentPayments,
    electricityBills,
    addTenant,
    updateTenant,
    deleteTenant,
    markPaid,
    updateRentPayment,
    updateElectricityBill,
  } = useRent()
  const [form, setForm] = useState(defaultForm)
  const [editingId, setEditingId] = useState('')

  const monthlyRentData = useMemo(() => {
    const grouped = rentPayments.reduce((acc, payment) => {
      if (!acc[payment.month]) acc[payment.month] = { month: payment.month, collected: 0 }
      if (payment.status === 'Paid') acc[payment.month].collected += Number(payment.rentAmount)
      return acc
    }, {})
    return Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month))
  }, [rentPayments])

  const paidUnpaidData = useMemo(
    () => [
      { name: 'Paid', value: rentPayments.filter((payment) => payment.status === 'Paid').length },
      { name: 'Unpaid', value: rentPayments.filter((payment) => payment.status === 'Unpaid').length },
    ],
    [rentPayments],
  )

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = { ...form, monthlyRent: Number(form.monthlyRent) }
    if (editingId) updateTenant(editingId, payload)
    else addTenant(payload)
    setForm(defaultForm)
    setEditingId('')
  }

  return (
    <div className="space-y-6">
      <Navbar title="Rent Manager" />

      <RentSummaryCard tenants={tenants} rentPayments={rentPayments} />

      <form onSubmit={onSubmit} className="grid gap-2 rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80 md:grid-cols-3">
        <input className="rounded border p-2 dark:bg-slate-800" required placeholder="Tenant name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
        <input className="rounded border p-2 dark:bg-slate-800" required placeholder="Phone" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} />
        <input className="rounded border p-2 dark:bg-slate-800" required placeholder="Property name" value={form.propertyName} onChange={(e) => setForm((prev) => ({ ...prev, propertyName: e.target.value }))} />
        <input className="rounded border p-2 dark:bg-slate-800" required type="number" placeholder="Monthly rent" value={form.monthlyRent} onChange={(e) => setForm((prev) => ({ ...prev, monthlyRent: e.target.value }))} />
        <select className="rounded border p-2 dark:bg-slate-800" value={form.rentDueDate} onChange={(e) => setForm((prev) => ({ ...prev, rentDueDate: e.target.value }))}>
          {Array.from({ length: 28 }, (_, idx) => String(idx + 1).padStart(2, '0')).map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <select className="rounded border p-2 dark:bg-slate-800" value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}>
          <option value="Active">Active</option>
          <option value="Left">Left</option>
        </select>
        <div className="md:col-span-3">
          <button className="rounded bg-brand-600 px-4 py-2 text-white">{editingId ? 'Update Tenant' : 'Add Tenant'}</button>
          {editingId ? (
            <button type="button" className="ml-2 rounded border px-4 py-2" onClick={() => { setEditingId(''); setForm(defaultForm) }}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <TenantTable
        tenants={tenants}
        onEdit={(tenant) => {
          setEditingId(tenant.id)
          setForm({
            name: tenant.name,
            phone: tenant.phone,
            propertyName: tenant.propertyName,
            monthlyRent: String(tenant.monthlyRent),
            rentDueDate: tenant.rentDueDate,
            status: tenant.status,
          })
        }}
        onDelete={deleteTenant}
      />

      <div className="overflow-auto rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80">
        <h3 className="mb-3 font-semibold">Rent Payment Tracker</h3>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="py-2">Tenant</th>
              <th>Amount</th>
              <th>Month</th>
              <th>Status</th>
              <th>Paid Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rentPayments.map((payment) => (
              <tr key={payment.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2">{payment.tenantName}</td>
                <td>{inr(payment.rentAmount)}</td>
                <td>{payment.month}</td>
                <td><RentStatusBadge status={payment.status} /></td>
                <td>
                  <input
                    type="date"
                    className="rounded border p-1 dark:bg-slate-800"
                    value={payment.paymentDate || ''}
                    onChange={(e) =>
                      updateRentPayment(payment.id, {
                        paymentDate: e.target.value,
                        status: e.target.value ? 'Paid' : payment.status,
                      })
                    }
                  />
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <select
                      className="rounded border p-1 dark:bg-slate-800"
                      value={payment.status}
                      onChange={(e) => updateRentPayment(payment.id, { status: e.target.value })}
                    >
                      <option value="Unpaid">Unpaid</option>
                      <option value="Paid">Paid</option>
                    </select>
                    {payment.status === 'Unpaid' ? (
                      <button
                        className="rounded bg-emerald-600 px-2 py-1 text-white"
                        onClick={() => markPaid(payment.id)}
                      >
                        Quick Pay
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-auto rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80">
        <h3 className="mb-3 font-semibold">Electricity Bill (Editable)</h3>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="py-2">Tenant</th>
              <th>Month</th>
              <th>Before Unit</th>
              <th>Current Unit</th>
              <th>Final Unit</th>
              <th>Rate / Unit</th>
              <th>Bill Amount</th>
              <th>Paid Amount</th>
              <th>Pending</th>
            </tr>
          </thead>
          <tbody>
            {electricityBills.map((bill) => {
              const beforeUnit = Number(bill.beforeUnit || 0)
              const currentUnit = Number(bill.currentUnit || 0)
              const finalUnit = Math.max(0, currentUnit - beforeUnit)
              const billAmount = finalUnit * Number(bill.ratePerUnit)
              const pending = Math.max(0, billAmount - Number(bill.paidAmount || 0))
              return (
                <tr key={bill.id} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2">{bill.tenantName}</td>
                  <td>{bill.month}</td>
                  <td>
                    <input
                      type="number"
                      className="w-20 rounded border p-1 dark:bg-slate-800"
                      value={bill.beforeUnit || 0}
                      onChange={(e) =>
                        updateElectricityBill(bill.id, { beforeUnit: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="w-20 rounded border p-1 dark:bg-slate-800"
                      value={bill.currentUnit || 0}
                      onChange={(e) =>
                        updateElectricityBill(bill.id, { currentUnit: e.target.value })
                      }
                    />
                  </td>
                  <td className="font-medium text-sky-500">{finalUnit}</td>
                  <td>
                    <input
                      type="number"
                      className="w-24 rounded border p-1 dark:bg-slate-800"
                      value={bill.ratePerUnit}
                      onChange={(e) =>
                        updateElectricityBill(bill.id, { ratePerUnit: e.target.value })
                      }
                    />
                  </td>
                  <td className="font-medium text-sky-500">{inr(billAmount)}</td>
                  <td>
                    <input
                      type="number"
                      className="w-24 rounded border p-1 dark:bg-slate-800"
                      value={bill.paidAmount}
                      onChange={(e) => updateElectricityBill(bill.id, { paidAmount: e.target.value })}
                    />
                  </td>
                  <td className={pending > 0 ? 'font-medium text-rose-500' : 'font-medium text-emerald-500'}>
                    {inr(pending)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 xl:grid-cols-2">
        <div className="h-80 rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80">
          <h3 className="mb-2 font-semibold">Monthly Rent Collection</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={monthlyRentData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="collected" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-80 rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80">
          <h3 className="mb-2 font-semibold">Paid vs Unpaid</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={paidUnpaidData} dataKey="value" nameKey="name" outerRadius={100} label>
                {paidUnpaidData.map((item) => (
                  <Cell key={item.name} fill={item.name === 'Paid' ? '#10b981' : '#ef4444'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </div>
  )
}
