import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface TTransactions {
  id: string;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: TTransactions[];
  fetchTransactions: (query?: string) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionContextType>({
  transactions: [],
  fetchTransactions: async () => undefined,
});

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsProvider = ({
  children,
}: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<TTransactions[]>([]);

  const fetchTransactions = async (query?: string) => {
    const { data } = await api.get("/transactions", {
      params: {
        q: query,
      },
    });

    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};
