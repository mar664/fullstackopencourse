import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { OrderBy, OrderDirection, RepositorySortType } from "../types";
import { assertNever } from "../utils";

interface ISortVariables {
  orderBy?: OrderBy;
  orderDirection?: OrderDirection;
  searchKeyword?: string;
  first?: number;
}

const useRepositories = (
  sortBy: RepositorySortType,
  searchBy: string,
  first: number
) => {
  const variables: ISortVariables = {};
  if (first) variables.first = first;
  switch (sortBy) {
    case RepositorySortType.Latest:
      variables.orderBy = OrderBy.CREATED_AT;
      variables.orderDirection = OrderDirection.DESC;
      break;
    case RepositorySortType.HighestRated:
      variables.orderBy = OrderBy.RATING_AVERAGE;
      variables.orderDirection = OrderDirection.DESC;
      break;
    case RepositorySortType.LowestRated:
      variables.orderBy = OrderBy.RATING_AVERAGE;
      variables.orderDirection = OrderDirection.ASC;
      break;
    default:
      assertNever(sortBy);
  }
  if (searchBy) {
    variables.searchKeyword = searchBy;
  }
  console.log(variables);
  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    error,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
