import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import SelectedProjectProvider from './providers/SelectedProjectProvider.tsx';

import AuthProvider from './providers/AuthProvider.tsx';
import { AppProvider } from './providers/AppProvider.tsx';

import { GoogleOAuthProvider } from '@react-oauth/google';
import atlasConfig from './atlasConfig.json';
import { BrowserRouter as Router } from 'react-router-dom';
import DataProvider from './providers/DataProvider.tsx';

const { appId } = atlasConfig;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AppProvider appId={appId}>
        <AuthProvider>
          <GoogleOAuthProvider clientId="272172951435-rv2e9utmesv2o6n44od52geptpfqr56q.apps.googleusercontent.com">
            <DataProvider>
              <SelectedProjectProvider>
                <App />
              </SelectedProjectProvider>
            </DataProvider>
          </GoogleOAuthProvider>
        </AuthProvider>
      </AppProvider>
    </Router>
  </React.StrictMode>,
);
