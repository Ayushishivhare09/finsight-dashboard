import { format } from 'date-fns'

const now = new Date()

export const seedTransactions = [
  {
    id: crypto.randomUUID(),
    type: 'income',
    amount: 85000,
    category: 'Investments',
    paymentMethod: 'Bank Transfer',
    date: format(now, 'yyyy-MM-02'),
    notes: 'Monthly salary credited',
    tags: ['salary'],
  },
  {
    id: crypto.randomUUID(),
    type: 'expense',
    amount: 22000,
    category: 'Rent',
    paymentMethod: 'Bank Transfer',
    date: format(now, 'yyyy-MM-05'),
    notes: 'Apartment rent',
    tags: ['home'],
  },
  {
    id: crypto.randomUUID(),
    type: 'expense',
    amount: 3400,
    category: 'Food',
    paymentMethod: 'UPI',
    date: format(now, 'yyyy-MM-06'),
    notes: 'Groceries',
    tags: ['essentials'],
  },
  {
    id: crypto.randomUUID(),
    type: 'expense',
    amount: 599,
    category: 'Entertainment',
    paymentMethod: 'Card',
    date: format(now, 'yyyy-MM-07'),
    notes: 'Netflix subscription',
    tags: ['subscription'],
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
