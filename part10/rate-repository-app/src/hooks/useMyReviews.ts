import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const useMyReviews = () => {
  const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  return {
    reviews: data ? data.me.reviews : undefined,
    error,
    loading,
    refetch,
  };
};

export default useMyReviews;
