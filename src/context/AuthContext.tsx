import { createContext, useContext, useState, ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/queries';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginMutation] = useMutation(LOGIN);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: {
          input: { email, password }
        }
      });

      console.log('Login response:', data);

      if (data?.login?.success) {
        setIsAuthenticated(true);
        // Cookie is automatically set by browser from Set-Cookie header
        return { success: true };
      }

      return { success: false, message: data?.login?.message || 'Login failed' };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, message: error?.message || 'Network error' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    // You may want to call a logout mutation to clear the cookie on the backend
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated,
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
