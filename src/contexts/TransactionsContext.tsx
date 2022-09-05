import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

export interface TTransactions {
  id: string
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface TransactionContextType {
  transactions: TTransactions[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: TTransactions) => Promise<void>
}

export const TransactionsContext = createContext<TransactionContextType>({
  transactions: [],
  fetchTransactions: async () => undefined,
  createTransaction: async () => undefined,
})

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsProvider = ({
  children,
}: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<TTransactions[]>([])

  const fetchTransactions = async (query?: string) => {
    const { data } = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(data)
  }

  const createTransaction = async (data: TTransactions) => {
    const { category, description, price, type, createdAt, id } = data
    const response = await api.post('/transactions', {
      id,
      description,
      type,
      category,
      price,
      createdAt,
    })
    setTransactions((oldState) => [response.data, ...oldState])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
