import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const graphqlClient = (accessToken) => {
  if (!accessToken) {
    return;
  }
  const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  const cache = new InMemoryCache();
  const ret = new ApolloClient({
    link: httpLink,
    cache,
  });
  if (ret) return ret;
};

export { graphqlClient };
