import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface Admin {
  name: string;
  email: string;
  password: string;
}

interface SignInCredentials {
  ra: string;
  password: string;
}

interface AdminAuthState {
  token: string;
  admin: Admin;
}

interface AdminAuthContextData {
  admin: Admin;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateAdmin(admin: Admin): void;
}

const AdminAuthContext = createContext<AdminAuthContextData>(
  {} as AdminAuthContextData,
);

const AdminAuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AdminAuthState>(() => {
    const token = localStorage.getItem('@SACT:admin:token');
    const admin = localStorage.getItem('@SACT:admin');

    if (token && admin) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, admin: JSON.parse(admin) };
    }

    return {} as AdminAuthState;
  });

  const signIn = useCallback(async ({ ra, password }) => {
    const response = await api.post<AdminAuthState>('admins/sessions', {
      ra,
      password,
    });

    const { token, admin } = response.data;

    localStorage.setItem('@SACT:admin:token', token);
    localStorage.setItem('@SACT:admin', JSON.stringify(admin));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, admin });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SACT:admin:token');
    localStorage.removeItem('@SACT:admin');

    setData({} as AdminAuthState);
  }, []);

  const updateAdmin = useCallback(
    (admin: Admin) => {
      localStorage.setItem('@SACT:admin', JSON.stringify(admin));

      setData({
        token: data.token,
        admin,
      });
    },
    [data.token],
  );

  return (
    <AdminAuthContext.Provider
      value={{ admin: data.admin, signIn, signOut, updateAdmin }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

function useAdminAuth(): AdminAuthContextData {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }

  return context;
}

export { AdminAuthProvider, useAdminAuth };
