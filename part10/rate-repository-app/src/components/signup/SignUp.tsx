import { useAuthStorage } from "../../contexts/AuthStorageContext";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { IGraphQLError, ISignupFormSubmitValues } from "../../types";
import { parseGraphQLError } from "../../utils/errors";
import SignInContainer from "./SignUpContainer";

import React from "react";
import useSignUp from "../../hooks/useSignup";
import useSignIn from "../../hooks/useSignIn";
const SignUp = () => {
  const [error, setError] = useState<IGraphQLError | undefined>(undefined);
  const [signup] = useSignUp();
  const [signIn] = useSignIn();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const onSubmit = async (values: ISignupFormSubmitValues) => {
    const { username, password } = values;
    try {
      const { data } = await signup({ username, password });
      console.log(data);
      const { data: signInData } = await signIn({ username, password });

      await authStorage.setAccessToken(signInData.authenticate.accessToken);
      apolloClient.resetStore();
      navigate("/repositories");
    } catch (error) {
      const parsedError = parseGraphQLError(error);
      if (parsedError) setError(parsedError);
    }
  };

  return <SignInContainer onSubmit={onSubmit} error={error} />;
};

export default SignUp;
