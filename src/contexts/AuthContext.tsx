import { createContext, useContext } from 'react';
import { AuthData } from '../types/auth';

type AuthState = {
  authData: AuthData | null;
  login: (credential: string) => void;
  logout: () => void;
  authLoading: boolean;
};

const AuthContext = createContext<AuthState | null>(null);

const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, useAuth };
