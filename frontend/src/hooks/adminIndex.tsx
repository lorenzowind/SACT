import React from 'react';

import { AdminAuthProvider } from './adminAuth';
import { EvaluatorProjectsProvider } from './evaluatorProjects';
import { ToastProvider } from './toast';

const AppProviderAdmin: React.FC = ({ children }) => (
  <AdminAuthProvider>
    <ToastProvider>
      <EvaluatorProjectsProvider>{children}</EvaluatorProjectsProvider>
    </ToastProvider>
  </AdminAuthProvider>
);

export default AppProviderAdmin;
