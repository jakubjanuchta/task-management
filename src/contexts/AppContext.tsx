import { createContext, useContext } from 'react';
import * as Realm from 'realm-web';

type AppContextState = Realm.App<
  globalThis.Realm.DefaultFunctionsFactory &
    globalThis.Realm.BaseFunctionsFactory,
  SimpleObject
> & {
  logIn: (any: any) => any;
};

const AppContext = createContext<AppContextState | null>(null);

const useApp = () => {
  const app = useContext(AppContext);

  if (!app) {
    throw new Error(
      `No App Services App found. Make sure to call useApp() inside of a <AppProvider />.`,
    );
  }
  return app;
};

export { AppContext, useApp };
