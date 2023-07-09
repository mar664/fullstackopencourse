import { View } from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { IGraphQLError, IReviewFormValues } from "../../types";

import React from "react";
import ReviewFormFields from "./ReviewFormFields";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().min(0).max(100).required("Rating is required"),
});

interface ISignInContainerProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: IReviewFormValues) => void;
  error: IGraphQLError | undefined;
}

const ReviewFormContainer = ({ onSubmit, error }: ISignInContainerProps) => {
  return (
    <View style={{ padding: 10 }}>
      <Formik
        initialValues={{ ownerName: "", repositoryName: "", rating: 0 }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<IReviewFormValues>) => {
          return <ReviewFormFields error={error} {...props} />;
        }}
      </Formik>
    </View>
  );
};

export default ReviewFormContainer;
