import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/queries';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [loginMutation] = useMutation(LOGIN);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: {
          input: { email, password }
        }
      });

      if (data?.login?.success && data?.login?.token) {
        setToken(data.login.token);
        localStorage.setItem('authToken', data.login.token);
        return { success: true };
      }

      return { success: false, message: data?.login?.message || 'Login failed' };
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!token,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
}
