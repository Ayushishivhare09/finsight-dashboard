import { format } from 'date-fns'
import { createContext, useContext, useEffect, useMemo } from 'react'
import { useFinance } from './FinanceContext.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const RentContext = createContext(null)

const initialTenants = [
  {
    id: crypto.randomUUID(),
    name: 'Rahul Verma',
    phone: '9876543210',
    propertyName: 'Green Residency A-202',
    monthlyRent: 18000,
    rentDueDate: '05',
    status: 'Active',
  },
]

export function RentProvider({ children }) {
  const [tenants, setTenants] = useLocalStorage('finsight.rent.tenants', initialTenants)
  const [rentPayments, setRentPayments] = useLocalStorage('finsight.rent.payments', [])
  const [electricityBills, setElectricityBills] = useLocalStorage('finsight.rent.electricityBills', [])
  const [rentHistory, setRentHistory] = useLocalStorage('finsight.rent.history', [])
  const { addTransaction, deleteTransaction } = useFinance()

  useEffect(() => {
    const month = format(new Date(), 'yyyy-MM')
    setRentPayments((prev) => {
      const next = [...prev]
      tenants
        .filter((tenant) => tenant.status === 'Active')
        .forEach((tenant) => {
          const exists = next.some((p) => p.tenantId === tenant.id && p.month === month)
          if (!exists) {
            next.push({
              id: crypto.randomUUID(),
              tenantId: tenant.id,
              tenantName: tenant.name,
              rentAmount: Number(tenant.monthlyRent),
              month,
              status: 'Unpaid',
              paymentDate: '',
            })
          }
        })
      return next
    })
  }, [tenants, setRentPayments])

  useEffect(() => {
    const month = format(new Date(), 'yyyy-MM')
    setElectricityBills((prev) => {
      const next = [...prev]
      tenants
        .filter((tenant) => tenant.status === 'Active')
        .forEach((tenant) => {
          const exists = next.some((bill) => bill.tenantId === tenant.id && bill.month === month)
          if (!exists) {
            next.push({
              id: crypto.randomUUID(),
              tenantId: tenant.id,
              tenantName: tenant.name,
              month,
              beforeUnit: 0,
              currentUnit: 0,
              ratePerUnit: 10,
              paidAmount: 0,
            })
          }
        })
      return next
    })
  }, [tenants, setElectricityBills])

  const value = useMemo(
    () => ({
      tenants,
      rentPayments,
      electricityBills,
      rentHistory,
      addTenant: (tenant) => setTenants((prev) => [{ id: crypto.randomUUID(), ...tenant }, ...prev]),
      updateTenant: (id, payload) =>
        setTenants((prev) => prev.map((tenant) => (tenant.id === id ? { ...tenant, ...payload } : tenant))),
      deleteTenant: (id) => {
        setTenants((prev) => prev.filter((tenant) => tenant.id !== id))
        setRentPayments((prev) => prev.filter((payment) => payment.tenantId !== id))
        setElectricityBills((prev) => prev.filter((bill) => bill.tenantId !== id))
        setRentHistory((prev) => prev.filter((item) => item.tenantId !== id))
      },
      markPaid: (paymentId) => {
        const today = format(new Date(), 'yyyy-MM-dd')
        let paidRecord = null
        setRentPayments((prev) =>
          prev.map((payment) => {
            if (payment.id !== paymentId || payment.status === 'Paid') return payment
            paidRecord = { ...payment, status: 'Paid', paymentDate: today }
            return paidRecord
          }),
        )
        if (!paidRecord) return
        setRentHistory((prev) => [{ ...paidRecord, historyId: crypto.randomUUID() }, ...prev])
        addTransaction({
          type: 'income',
          amount: Number(paidRecord.rentAmount),
          category: 'Investments',
          paymentMethod: 'Bank Transfer',
          date: today,
          notes: `Rent received from ${paidRecord.tenantName}`,
          tags: ['rent', 'recurring-income'],
        })
      },
      updateRentPayment: (paymentId, payload) => {
        let previous = null
        let nextRecord = null
        setRentPayments((prev) =>
          prev.map((payment) => {
            if (payment.id !== paymentId) return payment
            previous = payment
            nextRecord = { ...payment, ...payload }
            if (nextRecord.status === 'Paid' && !nextRecord.paymentDate) {
              nextRecord.paymentDate = format(new Date(), 'yyyy-MM-dd')
            }
            if (nextRecord.status === 'Unpaid') {
              nextRecord.paymentDate = ''
            }
            return nextRecord
          }),
        )
        if (!previous || !nextRecord) return

        if (previous.status !== 'Paid' && nextRecord.status === 'Paid') {
          const txId = addTransaction({
            type: 'income',
            amount: Number(nextRecord.rentAmount),
            category: 'Investments',
            paymentMethod: 'Bank Transfer',
            date: nextRecord.paymentDate,
            notes: `Rent received from ${nextRecord.tenantName}`,
            tags: ['rent', 'recurring-income'],
          })
          setRentPayments((prev) =>
            prev.map((payment) =>
              payment.id === paymentId ? { ...payment, transactionId: txId } : payment,
            ),
          )
        }

        if (previous.status === 'Paid' && nextRecord.status === 'Unpaid' && previous.transactionId) {
          deleteTransaction(previous.transactionId)
          setRentPayments((prev) =>
            prev.map((payment) =>
              payment.id === paymentId ? { ...payment, transactionId: '' } : payment,
            ),
          )
        }
      },
      updateElectricityBill: (billId, payload) => {
        setElectricityBills((prev) =>
          prev.map((bill) => {
            if (bill.id !== billId) return bill
            const next = { ...bill, ...payload }
            return {
              ...next,
              beforeUnit: Number(next.beforeUnit || 0),
              currentUnit: Number(next.currentUnit || 0),
              ratePerUnit: Number(next.ratePerUnit || 0),
              paidAmount: Number(next.paidAmount || 0),
            }
          }),
        )
      },
    }),
    [
      tenants,
      rentPayments,
      electricityBills,
      rentHistory,
      setTenants,
      setRentPayments,
      setElectricityBills,
      setRentHistory,
      addTransaction,
      deleteTransaction,
    ],
  )

  return <RentContext.Provider value={value}>{children}</RentContext.Provider>
}

export function useRent() {
  const context = useContext(RentContext)
  if (!context) throw new Error('useRent must be used within RentProvider')
  return context
}
