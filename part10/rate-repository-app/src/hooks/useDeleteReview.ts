import { FetchResult, MutationResult, useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

// eslint-disable-next-line no-unused-vars
type deleteReviewFunc = (id: string) => Promise<FetchResult<any>>;

const useDeleteReview = (): [deleteReviewFunc, MutationResult<any>] => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id: string) => {
    return mutate({ variables: { deleteReviewId: id } });
  };
  return [deleteReview, result];
};

export default useDeleteReview;
