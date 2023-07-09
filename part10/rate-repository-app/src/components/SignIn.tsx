import useSignIn from "../hooks/useSignIn";
import { useAuthStorage } from "../contexts/AuthStorageContext";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { IGraphQLError } from "../types";
import { parseGraphQLError } from "../utils/errors";
import SignInContainer from "./SignInContainer";

interface IValues {
  username: string;
  password: string;
}

import React from "react";
const SignIn = () => {
  const [error, setError] = useState<IGraphQLError | undefined>(undefined);
  const [signIn] = useSignIn();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const onSubmit = async (values: IValues) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      navigate("/repositories");
    } catch (error) {
      const parsedError = parseGraphQLError(error);
      if (parsedError) setError(parsedError);
    }
  };

  return <SignInContainer onSubmit={onSubmit} error={error} />;
};

export default SignIn;
