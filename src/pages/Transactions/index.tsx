import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

export const Transactions = () => {
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <TransactionsTable>
          <tbody>
            <tr>
              <td>Desenvolvimento de site</td>
              <PriceHighlight variant="income">R$ 12.000,00</PriceHighlight>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>
            <tr>
              <td>Desenvolvimento de site</td>
              <PriceHighlight variant="outcome">-R$ 12.000,00</PriceHighlight>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};
