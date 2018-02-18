/* eslint-disable */
import createStore from '../createStore';

test('creates Redux store', () => {
	const store = createStore({}, {});
	expect(store.dispatch).toBeInstanceOf(Function);
	expect(store.subscribe).toBeInstanceOf(Function);
	expect(store.getState).toBeInstanceOf(Function);
});
