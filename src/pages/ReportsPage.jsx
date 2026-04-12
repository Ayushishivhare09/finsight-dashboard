import Navbar from '../components/layout/Navbar.jsx'
import { useFinance } from '../context/FinanceContext.jsx'

const headers = ['type', 'amount', 'category', 'paymentMethod', 'date', 'notes', 'tags']

export default function ReportsPage() {
  const { transactions, importTransactions } = useFinance()

  const exportCsv = () => {
    const rows = transactions.map((t) => [t.type, t.amount, t.category, t.paymentMethod, t.date, t.notes, t.tags.join('|')].join(','))
    const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'finsight-report.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const onImport = (file) => {
    const reader = new FileReader()
    reader.onload = () => {
      const lines = String(reader.result).split('\n').filter(Boolean).slice(1)
      const rows = lines.map((line) => {
        const [type, amount, category, paymentMethod, date, notes, tags] = line.split(',')
        return { id: crypto.randomUUID(), type, amount: Number(amount), category, paymentMethod, date, notes, tags: (tags || '').split('|').filter(Boolean) }
      })
      importTransactions(rows)
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-4">
      <Navbar title="Reports" />
      <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
        <button className="rounded bg-brand-600 px-4 py-2 text-white" onClick={exportCsv}>Export CSV</button>
        <label className="ml-4 rounded border px-4 py-2">
          Import CSV
          <input type="file" className="hidden" accept=".csv" onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])} />
        </label>
      </div>
    </div>
  )
}
