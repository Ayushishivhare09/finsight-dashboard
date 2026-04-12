import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { seedBudgets, seedGoals, seedTransactions } from '../data/seedData.js'
import { getCurrentMonthTransactions, getTotals } from '../utils/analytics.js'

const FinanceContext = createContext(null)

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage('finsight.transactions', seedTransactions)
  const [budgets, setBudgets] = useLocalStorage('finsight.budgets', seedBudgets)
  const [goals, setGoals] = useLocalStorage('finsight.goals', seedGoals)

  const monthlyTransactions = getCurrentMonthTransactions(transactions)
  const totals = getTotals(monthlyTransactions)

  const value = useMemo(
    () => ({
      transactions,
      budgets,
      goals,
      monthlyTransactions,
      totals,
      addTransaction: (transaction) => {
        const id = crypto.randomUUID()
        setTransactions((prev) => [{ id, ...transaction }, ...prev])
        return id
      },
      updateTransaction: (id, payload) =>
        setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...payload } : t))),
      deleteTransaction: (id) => setTransactions((prev) => prev.filter((t) => t.id !== id)),
      setBudgets,
      setGoals,
      importTransactions: (rows) => setTransactions((prev) => [...rows, ...prev]),
    }),
    [transactions, budgets, goals, monthlyTransactions, totals, setBudgets, setGoals, setTransactions],
  )

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (!context) throw new Error('useFinance must be used within FinanceProvider')
  return context
}
