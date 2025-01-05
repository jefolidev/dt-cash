import { Header } from '../../components/header'
import { Summary } from '../../components/summary'
import { useTransactions } from '../../hooks/useTransactions'
import { SearchForm } from './componentes/search-form'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transaction() {
  const { transactions } = useTransactions()

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant="income">
                    R$ {transaction.price}
                  </PriceHighlight>
                </td>
                <td>{transaction.type}</td>
                <td>13/04/2022</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
