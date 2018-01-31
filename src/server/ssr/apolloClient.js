import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

const graphqlApiEndpoint = process.env.GRAPHQL_API_ENDPOINT || 'http://localhost:3000/api/1/graphql';

export default req => new ApolloClient({
	ssrMode: true,
	link: createHttpLink({
		uri: graphqlApiEndpoint,
		fetch,
		credentials: 'same-origin',
		headers: {
			cookie: req.header('Cookie')
		}
	}),
	cache: new InMemoryCache()
});