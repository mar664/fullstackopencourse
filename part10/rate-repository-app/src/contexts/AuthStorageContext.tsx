import { createContext, useContext } from "react";
import AuthStorage from "../utils/authStorage";

const AuthStorageContext = createContext<AuthStorage>(null!);

export const AuthStorageContextProvider = (props) => {
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
