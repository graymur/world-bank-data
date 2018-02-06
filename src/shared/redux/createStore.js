import {applyMiddleware, createStore, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import reducer from './reducer';
import isSSR from 'shared/utils/isSSR'; // eslint-disable-line

export default function configureStore(initialState, history) {
	const enhancers = [];
	const middleware = [];

	// if (process.env.NODE_ENV === 'development' && !isSSR()) {
	// 	middleware.push(require('redux-logger').default);
	// }

	if (history) {
		middleware.push(routerMiddleware(history));
	}

	const composedEnhancers = compose(
		applyMiddleware(...middleware),
		...enhancers
	);

	const store = createStore(reducer, initialState, composedEnhancers);

	if (module.hot) {
		module.hot.accept('./reducer', () => {
			const nextRootReducer = require('./reducer').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
