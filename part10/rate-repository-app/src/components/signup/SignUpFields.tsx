import React from "react";

import { Pressable } from "react-native";
import FormikTextInput from "../FormikTextInput";
import Text from "../Text";
import { FormikProps } from "formik";
import { IGraphQLError, ISignupFormValues } from "../../types";

const SignUpFields = ({
  error,
  handleSubmit,
}: FormikProps<ISignupFormValues> & { error: IGraphQLError | undefined }) => {
  return (
    <>
      {error ? (
        <Text style={{ padding: 10, textAlign: "center", color: "red" }}>
          {error.message}
        </Text>
      ) : (
        ""
      )}
      <FormikTextInput
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
        }}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
        }}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <FormikTextInput
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
        }}
        name="passwordConfirm"
        placeholder="Confirm Password"
        secureTextEntry
      />
      <Pressable
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={{ padding: 10, textAlign: "center" }} blueBackground>
          Submit
        </Text>
      </Pressable>
    </>
  );
};

export default SignUpFields;
