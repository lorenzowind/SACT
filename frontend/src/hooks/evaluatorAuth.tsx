import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface Evaluator {
  name: string;
  email: string;
  occupation_area: string;
  institution: string;
  phone_number: string;
  status: 'to_evaluate' | 'rated';
}

interface SignInCredentials {
  email: string;
}

interface EvaluatorAuthState {
  token: string;
  evaluator: Evaluator;
}

interface EvaluatorAuthContextData {
  evaluator: Evaluator;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateEvaluator(evaluator: Evaluator): void;
}

const EvaluatorAuthContext = createContext<EvaluatorAuthContextData>(
  {} as EvaluatorAuthContextData,
);

const EvaluatorAuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<EvaluatorAuthState>(() => {
    const token = localStorage.getItem('@SACT:evaluator:token');
    const evaluator = localStorage.getItem('@SACT:evaluator');

    if (token && evaluator) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, evaluator: JSON.parse(evaluator) };
    }

    return {} as EvaluatorAuthState;
  });

  const signIn = useCallback(async ({ email }) => {
    const response = await api.post<EvaluatorAuthState>('evaluators/sessions', {
      email,
    });

    const { token, evaluator } = response.data;

    localStorage.setItem('@SACT:evaluator:token', token);
    localStorage.setItem('@SACT:evaluator', JSON.stringify(evaluator));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, evaluator });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SACT:evaluator:token');
    localStorage.removeItem('@SACT:evaluator');

    setData({} as EvaluatorAuthState);
  }, []);

  const updateEvaluator = useCallback(
    (evaluator: Evaluator) => {
      localStorage.setItem('@SACT:evaluator', JSON.stringify(evaluator));

      setData({
        token: data.token,
        evaluator,
      });
    },
    [data.token],
  );

  return (
    <EvaluatorAuthContext.Provider
      value={{
        evaluator: data.evaluator,
        token: data.token,
        signIn,
        signOut,
        updateEvaluator,
      }}
    >
      {children}
    </EvaluatorAuthContext.Provider>
  );
};

function useEvaluatorAuth(): EvaluatorAuthContextData {
  const context = useContext(EvaluatorAuthContext);

  if (!context) {
    throw new Error(
      'useEvaluatorAuth must be used within an EvaluatorAuthProvider',
    );
  }

  return context;
}

export { EvaluatorAuthProvider, useEvaluatorAuth };
