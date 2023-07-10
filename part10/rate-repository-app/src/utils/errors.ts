import { IGraphQLError } from "../types";

export const parseGraphQLError = (
  error: unknown
): IGraphQLError | undefined => {
  if (
    error &&
    typeof error === "object" &&
    "graphQLErrors" in error &&
    Array.isArray(error.graphQLErrors) &&
    error.graphQLErrors.length > 0 &&
    typeof error.graphQLErrors[0] === "object" &&
    "message" in error.graphQLErrors[0]
  ) {
    return error.graphQLErrors[0];
  } else {
    console.error(error);
    return undefined;
  }
};
