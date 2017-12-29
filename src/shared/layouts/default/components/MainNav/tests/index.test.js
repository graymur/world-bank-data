/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';
import MainNav from '../index';

test('Renders content in wrapper', () => {
	const component = renderer.create(
		<StaticRouter location="someLocation" context={{}}>
			<MainNav/>
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
