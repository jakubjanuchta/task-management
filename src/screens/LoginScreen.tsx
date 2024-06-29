import { Container } from '@mui/material';

import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = () => {
  const { login } = useAuth();

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          credentialResponse.credential && login(credentialResponse.credential);
        }}
        onError={() => {
          alert('Login Failed');
        }}
      />
    </Container>
  );
};

export default LoginScreen;
