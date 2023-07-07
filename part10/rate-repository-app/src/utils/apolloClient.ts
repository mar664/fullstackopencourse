import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
console.log(process.env.EXPO_PUBLIC_API_URL);
const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: `http://192.168.86.85:5001/graphql`,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
