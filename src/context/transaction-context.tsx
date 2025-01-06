import { createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'

type TransactionTypes = 'income' | 'outcome'

export interface Transaction {
  id: number
  description: string
  type: TransactionTypes
  price: number
  category: string
  createdAt: Date
}

interface TransactionContext {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContext)

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query,
      },
    })
    setTransactions(response.data)
  }
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
