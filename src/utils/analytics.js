import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isWithinInterval,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { CATEGORIES, SUBSCRIPTION_KEYWORDS } from '../data/constants.js'

export function getCurrentMonthTransactions(transactions) {
  const today = new Date()
  const start = startOfMonth(today)
  const end = endOfMonth(today)
  return transactions.filter((t) => isWithinInterval(parseISO(t.date), { start, end }))
}

export function getTotals(transactions) {
  return transactions.reduce(
    (acc, t) => {
      const amount = Number(t.amount) || 0
      if (amount < 0) return acc // Skip invalid amounts
      
      if (t.type === 'income') acc.income += amount
      else if (t.type === 'expense') acc.expense += amount
      // Invalid types are ignored, not counted as expense
      
      return acc
    },
    { income: 0, expense: 0 },
  )
}

export function categoryExpenses(transactions) {
  return CATEGORIES.map((c) => ({
    name: c,
    value: transactions
      .filter((t) => t.type === 'expense' && t.category === c)
      .reduce((sum, t) => sum + Number(t.amount), 0),
  })).filter((x) => x.value > 0)
}

export function monthlyTrend(transactions) {
  const map = new Map()
  transactions.forEach((t) => {
    const k = format(parseISO(t.date), 'MMM yyyy')
    if (!map.has(k)) map.set(k, { month: k, income: 0, expense: 0 })
    if (t.type === 'income') map.get(k).income += Number(t.amount)
    else map.get(k).expense += Number(t.amount)
  })
  return [...map.values()]
}

export function detectSubscriptions(transactions) {
  const recurring = transactions.filter(
    (t) =>
      t.type === 'expense' &&
      SUBSCRIPTION_KEYWORDS.some((k) => `${t.notes} ${t.tags.join(' ')}`.toLowerCase().includes(k)),
  )
  return { items: recurring, monthlyCost: recurring.reduce((sum, t) => sum + Number(t.amount), 0) }
}

export function financeScore({ savingsRate, budgetUsage }) {
  const savingsPoints = Math.max(0, Math.min(40, savingsRate))
  const budgetPoints = Math.max(0, Math.min(30, 30 - Math.max(0, budgetUsage - 100)))
  const spendingPoints = budgetUsage <= 100 ? 30 : Math.max(0, 30 - (budgetUsage - 100))
  return Math.round(savingsPoints + budgetPoints + spendingPoints)
}

export function buildExpenseHeatmap(transactions) {
  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const totalsByDate = new Map()
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const k = t.date
      totalsByDate.set(k, (totalsByDate.get(k) || 0) + Number(t.amount))
    })

  const currentMonthValues = days
    .filter((d) => isSameMonth(d, now))
    .map((d) => totalsByDate.get(format(d, 'yyyy-MM-dd')) || 0)
  const max = Math.max(1, ...currentMonthValues)

  const cells = days.map((d) => {
    const dateKey = format(d, 'yyyy-MM-dd')
    const amount = totalsByDate.get(dateKey) || 0
    return {
      date: dateKey,
      day: format(d, 'd'),
      inCurrentMonth: isSameMonth(d, now),
      amount,
      level: amount === 0 ? 0 : Math.ceil((amount / max) * 4),
    }
  })

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}
