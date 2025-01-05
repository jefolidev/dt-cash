import { useContext } from 'react'
import { TransactionsContext } from '../context/transaction-context'

export function useTransactions() {
  return useContext(TransactionsContext)
}
