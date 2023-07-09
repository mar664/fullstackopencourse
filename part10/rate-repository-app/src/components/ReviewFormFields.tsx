import React from "react";

import { Pressable } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import { FormikProps } from "formik";
import { IGraphQLError, IReviewFormValues } from "../types";

const ReviewFormFields = ({
  error,
  handleSubmit,
}: FormikProps<IReviewFormValues> & { error: IGraphQLError | undefined }) => {
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
        name="ownerName"
        placeholder="Repository owner name"
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
        name="repositoryName"
        placeholder="Repository name"
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
        name="rating"
        placeholder="Rating between 0 and 100"
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
        name="text"
        placeholder="Review"
        multiline
      />
      <Pressable
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={{ padding: 10, textAlign: "center" }} blueBackground>
          Create a review
        </Text>
      </Pressable>
    </>
  );
};

export default ReviewFormFields;
