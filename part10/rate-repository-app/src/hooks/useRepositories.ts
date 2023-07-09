import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { OrderBy, OrderDirection, RepositorySortType } from "../types";
import { assertNever } from "../utils";

interface ISortVariables {
  orderBy?: OrderBy;
  orderDirection?: OrderDirection;
}

const useRepositories = (sortBy: RepositorySortType) => {
  const variables: ISortVariables = {};
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

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  return { data, error, loading };
};

export default useRepositories;
