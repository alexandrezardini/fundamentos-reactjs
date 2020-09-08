import React, { useState, useEffect, useCallback } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import { useTransaction } from '../../hooks/transactions';
import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';

import {
  Container,
  CardContainer,
  Card,
  TableContainer,
  DeleteButton,
} from './styles';

const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  const {
    balance,
    transactions,
    getTransactions,
    deleteTransaction,
  } = useTransaction();

  useEffect(() => {
    try {
      getTransactions();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar as transações',
        description: 'Verifique a conexão com a internet',
      });
    }
  }, [addToast, getTransactions]);

  const handleDeleteTransaction = useCallback(
    async (id: string) => {
      try {
        await deleteTransaction(id);

        addToast({
          type: 'error',
          title: 'Transação deletada',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar a transação',
        });
      }
    },
    [addToast, deleteTransaction],
  );

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            {transactions &&
              transactions.map(transaction => (
                <tbody key={transaction.id}>
                  <tr>
                    <td className="title">{transaction.title}</td>

                    {transaction.type === 'income' ? (
                      <td className="income">{transaction.formattedValue}</td>
                    ) : (
                      <td className="outcome">
                        - {transaction.formattedValue}
                      </td>
                    )}

                    <td>{transaction.category.title}</td>
                    <td>{transaction.formattedDate}</td>
                    <td>
                      <DeleteButton
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        <FiTrash2 size={20} />
                      </DeleteButton>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
