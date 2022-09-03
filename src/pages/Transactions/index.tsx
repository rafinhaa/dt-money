import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./sections/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

interface TTransactions {
  id: string;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export const Transactions = () => {
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
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(
              ({ id, description, price, type, category, createdAt }) => (
                <tr key={id}>
                  <td>{description}</td>
                  <PriceHighlight variant={type}>{price}</PriceHighlight>
                  <td>{category}</td>
                  <td>{createdAt}</td>
                </tr>
              )
            )}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};
