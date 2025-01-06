import { createContext, useEffect, useState } from 'react'

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
}

export const TransactionsContext = createContext({} as TransactionContext)

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch('http://localhost:3000/transactions')
      const data = await response.json()

      setTransactions(data)
    }
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
