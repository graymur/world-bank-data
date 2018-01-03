/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../index';

test('Renders content in wrapper', () => {
	const component = renderer.create(
		<Footer/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
