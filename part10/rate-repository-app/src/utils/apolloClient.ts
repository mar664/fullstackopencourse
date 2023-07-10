import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { API_URL } from "@env";
import { setContext } from "@apollo/client/link/context";
import AuthStorage from "./authStorage";
import { relayStylePagination } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: `${API_URL}/graphql`,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (authStorage: AuthStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;
