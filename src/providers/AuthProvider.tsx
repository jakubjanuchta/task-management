import { useState, ReactNode, useEffect } from 'react';
import { AuthData, User } from '../types/auth';
import { AuthContext } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  const { addUser } = useUsers();

  useEffect(() => {
    const credential = localStorage.getItem('user');

    if (credential) {
      setAuthData({ user: jwtDecode(JSON.parse(credential)) });
    }

    setAuthLoading(false);
  }, []);

  const login = (credential: string) => {
    if (credential) {
      localStorage.setItem('user', JSON.stringify(credential));

      const user = jwtDecode(credential) as User;

      setAuthData({ user: user });

      addUser({
        sub: user.sub,
        name: user.name,
        email: user.email,
      });

      navigate('/projects');

      enqueueSnackbar('Logged in', {
        variant: 'success',
      });
    } else {
      // enqueueSnackbar('Invalid credentials', {
      //   variant: 'error',
      // });
    }
  };

  const logout = () => {
    setAuthData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        authLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
