import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { SearchForm } from "./sections/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

export const Transactions = () => {
  const { transactions } = useContext(TransactionsContext);

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
