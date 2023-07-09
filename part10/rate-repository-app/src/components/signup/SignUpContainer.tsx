import { View } from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { IGraphQLError, ISignupFormValues } from "../../types";

import React from "react";
import SignUpFields from "./SignUpFields";

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required("Username is required"),
  password: yup.string().min(5).max(30).required("Password is required"),
  passwordConfirm: yup
    .string()
    .min(5)
    .max(30)
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

interface ISignUpContainerProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: ISignupFormValues) => void;
  error: IGraphQLError | undefined;
}

const SignUpContainer = ({ onSubmit, error }: ISignUpContainerProps) => {
  return (
    <View style={{ padding: 10 }}>
      <Formik
        initialValues={{ username: "", password: "", passwordConfirm: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<ISignupFormValues>) => {
          return <SignUpFields error={error} {...props} />;
        }}
      </Formik>
    </View>
  );
};

export default SignUpContainer;
