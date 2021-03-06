import React from 'react';
import {renderToString} from 'react-dom/server';
import Helmet from 'react-helmet';
import {Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {createMemoryHistory} from 'history';
import routes from 'shared/routes';
import createStore from 'shared/redux/createStore';
import renderRoute from 'shared/utils/renderRoute';
import getStatusForURL from './getStatusForURL';
import Layout from 'shared/layouts/default';
import {ApolloProvider, getDataFromTree} from 'react-apollo';
import getApolloClient from './apolloClient';

/**
 * TODO: figure out why "routing" part of state set
 * on server is not respected on the client and
 * "@@router/LOCATION_CHANGE" event is fired despite
 * SSR
 */
export default async (req, template) => {
	const url = req.originalUrl || req.url;
	const history = createMemoryHistory({initialEntries: [url]});
	const store = createStore({}, history);

	const status = getStatusForURL(routes, url);
	const client = getApolloClient(req);

	const App = (
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

	await getDataFromTree(App);

	const renderedContent = renderToString(App);

	const helmet = Helmet.renderStatic();
	let content = template;

	content = content.replace('<div id="react-root"></div>', `<div id="react-root">${renderedContent}</div>`);
	content = content.replace('window.__RSTATE__ = {}', `window.__RSTATE__ = ${JSON.stringify(store.getState())}`);
	content = content.replace('window.__ASTATE__ = {}', `window.__ASTATE__ = ${JSON.stringify(client.extract()).replace(/</g, '\\u003c')}`);
	content = content.replace('<title></title>', helmet.title.toString());

	return {content, status};
};
