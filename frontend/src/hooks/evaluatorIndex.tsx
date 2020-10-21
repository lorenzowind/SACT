import React from 'react';

import { EvaluatorAuthProvider } from './evaluatorAuth';
import { EvaluatorAvaliationProvider } from './evaluatorAvaliation';

const AppProviderEvaluator: React.FC = ({ children }) => (
  <EvaluatorAuthProvider>
    <EvaluatorAvaliationProvider>{children}</EvaluatorAvaliationProvider>
  </EvaluatorAuthProvider>
);

export default AppProviderEvaluator;
