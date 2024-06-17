import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import * as Realm from 'realm-web';
import atlasConfig from '../atlasConfig.json';
import { AppContext } from '../contexts/AppContext';

const mongoEmail = import.meta.env.VITE_DB_USERNAME;
const mongoPassword = import.meta.env.VITE_DB_PASSWORD;

const { baseUrl } = atlasConfig;

function createApp(id: string) {
  return new Realm.App({ id, baseUrl });
}

type AppProviderProps = {
  appId: string;
  children: ReactNode;
};

export function AppProvider({ appId, children }: AppProviderProps) {
  const [app, setApp] = useState(createApp(appId));

  useEffect(() => {
    setApp(createApp(appId));
    logIn(
      Realm.Credentials.emailPassword(mongoEmail || '', mongoPassword || ''),
    );
  }, [appId]);

  const logIn = useCallback(
    async (credentials: Realm.Credentials) => {
      await app.logIn(credentials);
    },
    [app],
  );

  const appContext = useMemo(() => {
    return { ...app, logIn, currentUser: app.currentUser };
  }, [app, logIn]);

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
}
