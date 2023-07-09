import { FetchResult, MutationResult, useMutation } from "@apollo/client";
import { NEW_REVIEW } from "../graphql/mutations";
import { IReviewFormValues } from "../types";

// eslint-disable-next-line no-unused-vars
type newReviewFunc = (arg: IReviewFormValues) => Promise<FetchResult<any>>;

const useNewReview = (): [newReviewFunc, MutationResult<any>] => {
  const [mutate, result] = useMutation(NEW_REVIEW);

  const newReview = async ({
    ownerName,
    repositoryName,
    rating,
    text,
  }: IReviewFormValues) => {
    return mutate({
      variables: { review: { ownerName, repositoryName, rating, text } },
    });
  };
  return [newReview, result];
};

export default useNewReview;
