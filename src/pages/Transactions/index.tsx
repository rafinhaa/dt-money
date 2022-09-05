import { useContext } from 'react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './sections/SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export const Transactions = () => {
  const { transactions } = useContext(TransactionsContext)

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
                  <PriceHighlight variant={type}>
                    {type === 'outcome' && '- '}
                    {priceFormatter(price)}
                  </PriceHighlight>
                  <td>{category}</td>
                  <td>{dateFormatter(new Date(createdAt))}</td>
                </tr>
              ),
            )}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
