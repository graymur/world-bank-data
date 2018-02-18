/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';
import renderRoute from '../renderRoute';

const config = {
	path: '/path',
	exact: true,
	component: () => (<h1>I'm an H1 tag</h1>)
};

test('Renders route if it matches url', () => {
	const component = renderer.create(
		<StaticRouter location="/path" context={{}}>
			{renderRoute(config)}
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
test('Renders nothing if rout does not match url', () => {
	const component = renderer.create(
		<StaticRouter location="/other-path" context={{}}>
			{renderRoute(config)}
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
