import React from 'react';

import { EvaluatorAuthProvider } from './evaluatorAuth';

const AppProviderEvaluator: React.FC = ({ children }) => (
  <EvaluatorAuthProvider>{children}</EvaluatorAuthProvider>
);

export default AppProviderEvaluator;
