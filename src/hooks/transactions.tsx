/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import formatValue from '../utils/formatValue';

interface PostTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface TransactionContextData {
  postTransaction(transaction: PostTransaction): Promise<void>;
  getTransactions(): Promise<void>;
  deleteTransaction(id: string): Promise<void>;
  transactions: Transaction[];
  balance: Balance;
}

const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData,
);

const TransactionProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  const getTransactions = useCallback(async (): Promise<void> => {
    const response = await api.get('transactions');

    const transactionsFormatted = response.data.transactions.map(
      (transaction: Transaction) => ({
        ...transaction,
        formattedValue: formatValue(transaction.value),
        formattedDate: new Date(transaction.created_at).toLocaleDateString(
          'pt-br',
        ),
      }),
    );

    const balanceFormatted = {
      income: formatValue(response.data.balance.income),
      outcome: formatValue(response.data.balance.outcome),
      total: formatValue(response.data.balance.total),
    };

    setTransactions(transactionsFormatted);
    setBalance(balanceFormatted);
  }, []);

  const postTransaction = useCallback(
    async ({ title, value, type, category }: PostTransaction) => {
      await api.post('transactions', {
        title,
        value,
        type,
        category,
      });
    },
    [],
  );

  const deleteTransaction = useCallback(
    async (id: string) => {
      await api.delete(`transactions/${id}`);
      getTransactions();
    },
    [getTransactions],
  );

  return (
    <TransactionContext.Provider
      value={{
        postTransaction,
        getTransactions,
        deleteTransaction,
        transactions,
        balance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

function useTransaction(): TransactionContextData {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error('useAuth must be used within an TransactionProvider');
  }

  return context;
}
export { TransactionProvider, useTransaction };
