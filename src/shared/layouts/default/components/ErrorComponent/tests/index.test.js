/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import ErrorComponent from '../index';

test('should render an <span> tag', () => {
	const component = renderer.create(<ErrorComponent error='Some error' />);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
