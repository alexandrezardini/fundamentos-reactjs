import React from 'react';
import { TransactionProvider } from './transactions';
import { ToastProvider } from './toast';

const AppContext: React.FC = ({ children }) => (
  <TransactionProvider>
    <ToastProvider>{children}</ToastProvider>
  </TransactionProvider>
);

export default AppContext;
