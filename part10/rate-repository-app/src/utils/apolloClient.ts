import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { API_URL } from "@env";

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: `${API_URL}/graphql`,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
