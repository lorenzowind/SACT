import React from 'react';

import { AdminAuthProvider } from './adminAuth';
import { ToastProvider } from './toast';

const AppProviderAdmin: React.FC = ({ children }) => (
  <AdminAuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AdminAuthProvider>
);

export default AppProviderAdmin;
