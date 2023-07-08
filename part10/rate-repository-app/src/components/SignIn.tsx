import { View } from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import SignInFields from "./SignInFields";
import useSignIn from "../hooks/useSignIn";
import { useAuthStorage } from "../contexts/AuthStorageContext";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { IGraphQLError } from "../types";
import { parseGraphQLError } from "../utils/errors";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

interface IValues {
  username: string;
  password: string;
}

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
  return (
    <View style={{ padding: 10 }}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<IValues>) => {
          return <SignInFields error={error} {...props} />;
        }}
      </Formik>
    </View>
  );
};

export default SignIn;
