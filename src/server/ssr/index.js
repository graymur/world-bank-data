import React from 'react';
import {renderToString} from 'react-dom/server';
import Helmet from 'react-helmet';
import {Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {createMemoryHistory} from 'history';
import routes from 'shared/routes';
import createStore, {sagaMiddleware} from 'shared/redux/createStore';
import renderRoute from 'shared/utils/renderRoute';
import getSagasForURL from './getSagasForURL';
import getStatusForURL from './getStatusForURL';
import runSagas from './runSagas';
import Layout from 'shared/layouts/default';
import fetch from 'node-fetch';

import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import Express from 'express';
import {InMemoryCache} from 'apollo-cache-inmemory';

const env = process.env.NODE_ENV;

/**
 * TODO: figure out why "routing" part of state set
 * on server is not respected on the client and
 * "@@router/LOCATION_CHANGE" event is fired despite
 * SSR
 */

function funcName(fn) {
	return fn.toString().match(/^function\s?([^\s(]*)/)[1];
}

export default async (req, template) => {
	const url = req.originalUrl || req.url;
	const history = createMemoryHistory({initialEntries: [url]});
	const store = createStore({}, history);

	const status = getStatusForURL(routes, url);
	const sagas = getSagasForURL(routes, url);

	if (sagas.length && env !== 'production') {
		console.log('Sagas to run:', sagas.map(x => funcName(x[0])).join(', '));
	}

	await sagaMiddleware.run(runSagas(sagas)).done;

	const client = new ApolloClient({
		ssrMode: true,
		// Remember that this is the interface the SSR server will use to connect to the
		// API server, so we need to ensure it isn't firewalled, etc
		link: createHttpLink({
			uri: 'http://localhost:3000/api/1/graphql',
			fetch,
			credentials: 'same-origin',
			headers: {
				cookie: req.header('Cookie')
			}
		}),
		cache: new InMemoryCache()
	});

	const renderedContent = renderToString(
		<ApolloProvider client={client}>
			<Provider store={store}>
				<ConnectedRouter history={history} location={url}>
					<Layout>
					<span>{/* Needed to substitute CSSTransitionGroup's span on server*/}
						<Switch>
							{routes.map(renderRoute)}
						</Switch>
					</span>
					</Layout>
				</ConnectedRouter>
			</Provider>
		</ApolloProvider>
	);

	console.log('CLIENT DATA', client.extract());

	const helmet = Helmet.renderStatic();
	let content = template;

	content = content.replace('<div id="react-root"></div>', `<div id="react-root">${renderedContent}</div>`);
	content = content.replace('window.__INITIAL_STATE__ = {}', `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`);
	content = content.replace('<title></title>', helmet.title.toString());

	return {content, status};
};
