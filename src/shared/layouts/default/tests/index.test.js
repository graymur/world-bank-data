/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';
import {Layout} from '../index';

test('Renders content in wrapper', () => {
	const component = renderer.create(
		<StaticRouter location="someLocation" context={{}}>
			<Layout><h1>content</h1></Layout>
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Renders error component if error is passed in props', () => {
	const component = renderer.create(
		<StaticRouter location="someLocation" context={{}}>
			<Layout error={'Error text'}><h1>content</h1></Layout>
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

// test('Calls setError function if child component throws error', () => {
// 	const setError = jest.fn();
//
// 	/**
// 	 * React does "console.error" error caught in componentDidCatch.
// 	 * It doesn't affect the test but is very annoying. This is a rude way to mute it.
// 	 * JSDom will do it's own "console.log", didn't find a way to mute it.
// 	 */
// 	const consoleError = global.console.error;
// 	global.console.error = () => {};
//
// 	const ComponentWithError = () => {
// 		throw new Error('Some error');
// 	};
//
// 	const component = renderer.create(
// 		<StaticRouter location="someLocation" context={{}}>
// 			<Layout setError={setError}><ComponentWithError/></Layout>
// 		</StaticRouter>
// 	);
//
// 	expect(setError.mock.calls.length).toBe(1);
// 	expect(setError.mock.calls[0][0].message).toBe('Some error');
//
// 	global.console.error = consoleError;
// });
