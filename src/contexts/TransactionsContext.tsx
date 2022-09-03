import { createContext, ReactNode, useEffect, useState } from "react";

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
}

export const TransactionsContext = createContext<TransactionContextType>({
  transactions: [],
});

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsProvider = ({
  children,
}: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<TTransactions[]>([]);

  const loadTransactions = async () => {
    const data = await fetch("http://localhost:3333/transactions")
      .then((response) => response.json())
      .then((data) => data);

    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};
