import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";

import AuthStorage from "./src/utils/authStorage";
import { AuthStorageContextProvider } from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();

const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContextProvider>
            <Main />
            <StatusBar style="auto" />
          </AuthStorageContextProvider>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
