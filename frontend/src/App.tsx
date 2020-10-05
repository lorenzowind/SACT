import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProviderAdmin from './hooks/adminIndex';
import AppProviderEvaluator from './hooks/evaluatorIndex';

import AdminRoutes from './routes/adminIndex';
import EvaluatorRoutes from './routes/evaluatorIndex';

const App: React.FC = () => (
  <Router>
    <AppProviderAdmin>
      <AdminRoutes />
    </AppProviderAdmin>

    <AppProviderEvaluator>
      <EvaluatorRoutes />
    </AppProviderEvaluator>

    <GlobalStyle />
  </Router>
);

export default App;
