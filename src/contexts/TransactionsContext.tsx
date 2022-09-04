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
    const url = new URL("http://localhost:3333/transactions");

    if (query) url.searchParams.append("q", query);

    const data = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);

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
