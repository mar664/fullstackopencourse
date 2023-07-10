import { createContext, useContext } from "react";
import AuthStorage from "../utils/authStorage";
import * as React from "react";

const AuthStorageContext = createContext<AuthStorage>(null!);
interface IAuthProps {
  children: React.ReactNode;
}

export const AuthStorageContextProvider = (props: IAuthProps) => {
  return (
    <AuthStorageContext.Provider value={new AuthStorage()}>
      {props.children}
    </AuthStorageContext.Provider>
  );
};

export const useAuthStorage = (): AuthStorage => {
  const context = useContext(AuthStorageContext);
  return context;
};

export default AuthStorageContext;
