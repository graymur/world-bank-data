import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import createStore from 'shared/redux/createStore';
import routes from 'shared/routes';
import renderRoute from 'shared/utils/renderRoute';
import history from './history';
import Layout from 'shared/layouts/default';
import {ApolloProvider} from 'react-apollo';
import client from './apolloClient';

// import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
//
// const client = new ApolloClient({
// 	link: new HttpLink({ uri: '/api/1/graphql' }),
// 	cache: (new InMemoryCache()).restore(window.__ASTATE__ || {})
// });

const store = createStore(window.__RSTATE__ || {}, history);

const pageTransitionSpeed = 300;

export default class RootContainer extends React.Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Provider store={store}>
					<ConnectedRouter history={history}>
						<Layout>
							<Route render={({location}) => (
								<CSSTransitionGroup
									transitionName='page-switch'
									transitionEnterTimeout={pageTransitionSpeed}
									transitionLeaveTimeout={pageTransitionSpeed}
								>
									<Switch key={location.key} location={location}>
										{routes.map(renderRoute)}
									</Switch>
								</CSSTransitionGroup>
							)}/>
						</Layout>
					</ConnectedRouter>
				</Provider>
			</ApolloProvider>
		);
	}
}

const html = document.getElementsByTagName('html')[0];
html.style.setProperty('--page-transition-speed', `${pageTransitionSpeed}ms`);
