import { View } from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import SignInFields from "./SignInFields";
import { IGraphQLError } from "../../types";

import React from "react";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

interface IValues {
  username: string;
  password: string;
}

interface ISignInContainerProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: IValues) => void;
  error: IGraphQLError | undefined;
}

const SignInContainer = ({ onSubmit, error }: ISignInContainerProps) => {
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

export default SignInContainer;
