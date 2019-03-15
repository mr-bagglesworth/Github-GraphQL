import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
// graphql client
// - takes an access token created by an env file, or github login
const graphqlClient = accessToken => {
  // setup httplink and cache
  const httpLink = new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  const cache = new InMemoryCache();

  // specify link and cache properties on graphql config object
  return new ApolloClient({
    link: httpLink,
    cache
  });
};

export { graphqlClient };
