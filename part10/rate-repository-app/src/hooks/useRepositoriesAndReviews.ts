import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_AND_REVIEWS } from "../graphql/queries";

interface IVariables {
  repositoryId: String | undefined;
  first?: number;
}

const useRepositoriesAndReviews = (id: string | undefined, first: number) => {
  const variables: IVariables = { repositoryId: id, first };
  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORY_AND_REVIEWS,
    {
      fetchPolicy: "cache-and-network",
      skip: !id,
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    reviews: data?.repository.reviews,
    error,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositoriesAndReviews;
