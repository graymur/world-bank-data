/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import Modal from '../index';

test('Renders children in wrapper', () => {
	const component = renderer.create(<Modal><h1>content</h1></Modal>);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
