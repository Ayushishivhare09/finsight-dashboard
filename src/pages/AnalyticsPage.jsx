import CategoryPieChart from '../charts/CategoryPieChart.jsx'
import IncomeExpenseBarChart from '../charts/IncomeExpenseBarChart.jsx'
import MonthlyTrendChart from '../charts/MonthlyTrendChart.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import { useFinance } from '../context/FinanceContext.jsx'
import { categoryExpenses, monthlyTrend } from '../utils/analytics.js'

export default function AnalyticsPage() {
  const { transactions, monthlyTransactions } = useFinance()
  return (
    <div className="space-y-4">
      <Navbar title="Analytics" />
      <div className="grid gap-4 xl:grid-cols-2">
        <MonthlyTrendChart data={monthlyTrend(transactions)} />
        <CategoryPieChart data={categoryExpenses(monthlyTransactions)} />
      </div>
      <IncomeExpenseBarChart data={monthlyTrend(transactions)} />
    </div>
  )
}
