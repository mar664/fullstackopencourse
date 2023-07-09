import { useNavigate } from "react-router-native";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { IGraphQLError, IReviewFormValues } from "../types";
import { parseGraphQLError } from "../utils/errors";

import React from "react";
import ReviewFormContainer from "./ReviewFormContainer";
import useNewReview from "../hooks/useNewReview";

const ReviewForm = () => {
  const [error, setError] = useState<IGraphQLError | undefined>(undefined);
  const [newReview] = useNewReview();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const onSubmit = async (values: IReviewFormValues) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await newReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });
      apolloClient.resetStore();
      navigate(`/repositories/${data.createReview.repository.id}`);
    } catch (error) {
      const parsedError = parseGraphQLError(error);
      if (parsedError) setError(parsedError);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} error={error} />;
};

export default ReviewForm;
