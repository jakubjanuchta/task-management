import { Navigate, redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode, useEffect } from 'react';

const AuthWall = ({ children }: { children: ReactNode }) => {
  const { authData, authLoading } = useAuth();

  console.log('authData in auth wall', authData);

  if (!authData?.user && !authLoading) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthWall;
