/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface PostTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

interface TransactionContextData {
  postTransaction(transaction: PostTransaction): Promise<void>;
}

const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData,
);

const TransactionProvider: React.FC = ({ children }) => {
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

  return (
    <TransactionContext.Provider value={{ postTransaction }}>
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
