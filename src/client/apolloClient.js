import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default new ApolloClient({
	link: new HttpLink({ uri: '/api/1/graphql' }),
	cache: (new InMemoryCache()).restore(window.__ASTATE__ || {})
});
