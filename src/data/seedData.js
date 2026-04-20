import { format } from 'date-fns'

const now = new Date()

export const seedTransactions = [
  {
    id: crypto.randomUUID(),
    type: 'income',
    amount: 85000,
    category: 'Investments',
    paymentMethod: 'Bank Transfer',
    date: format(now, 'yyyy-MM-dd'),
    notes: 'Monthly salary credited',
    tags: ['salary'],
  },
  {
    id: crypto.randomUUID(),
    type: 'expense',
    amount: 22000,
    category: 'Rent',
    paymentMethod: 'Bank Transfer',
    date: format(new Date(now.getTime() - 8*24*60*60*1000), 'yyyy-MM-dd'),
    notes: 'Apartment rent',
    tags: ['home'],
  },
  {
    id: crypto.randomUUID(),
    type: 'expense',
    amount: 3400,
    category: 'Food',
    paymentMethod: 'UPI',
    date: format(new Date(now.getTime() - 7*24*60*60*1000), 'yyyy-MM-dd'),
    notes: 'Groceries',
    tags: ['essentials'],
  },
  {
    id: crypto.randomUUID(),
    type: 'expense',
    amount: 599,
    category: 'Entertainment',
    paymentMethod: 'Card',
    date: format(new Date(now.getTime() - 6*24*60*60*1000), 'yyyy-MM-dd'),
    notes: 'Netflix subscription',
    tags: ['subscription'],
  },
  {
    id: crypto.randomUUID(),
    type: 'income',
    amount: 5000,
    category: 'Other',
    paymentMethod: 'Cash',
    date: format(new Date(now.getTime() - 5*24*60*60*1000), 'yyyy-MM-dd'),
    notes: 'Freelance work',
    tags: ['side-income'],
  },
  {
    id: crypto.randomUUID(),
    type: 'expense',
    amount: 1500,
    category: 'Food',
    paymentMethod: 'Cash',
    date: format(new Date(now.getTime() - 3*24*60*60*1000), 'yyyy-MM-dd'),
    notes: 'Local market shopping',
    tags: ['essentials'],
  },
]

export const seedBudgets = {
  monthlyBudget: 60000,
  categoryBudgets: {
    Food: 9000,
    Grocery: 6000,
    Vegetables: 4000,
    Fruits: 3500,
    Rent: 25000,
    Transport: 5000,
    Shopping: 6000,
    Health: 4000,
    Entertainment: 3500,
    Bills: 7000,
    Education: 5000,
    Investments: 10000,
    Other: 3000,
  },
}

export const seedGoals = [
  { id: crypto.randomUUID(), name: 'Emergency Fund', target: 200000, saved: 90000 },
  { id: crypto.randomUUID(), name: 'Laptop', target: 120000, saved: 50000 },
]
