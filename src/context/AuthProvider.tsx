// TODO: add types

import { ReactNode, createContext, useState } from 'react';

type AuthObj =
  | {
      access_token?: string;
    }
  | undefined;

type AuthContextInterface = {
  auth?: AuthObj;
  setAuth?: any;
};

type AuthProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextInterface>({});

export const AuthProvider = ({ children }: AuthProps) => {
  const [auth, setAuth] = useState<AuthObj>({});

  const authContextData: AuthContextInterface = {
    auth,
    setAuth,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
