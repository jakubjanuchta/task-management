import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

const AuthWall = ({ children }: { children: ReactNode }) => {
  const { authData, authLoading } = useAuth();

  if (!authData?.user && !authLoading) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthWall;
