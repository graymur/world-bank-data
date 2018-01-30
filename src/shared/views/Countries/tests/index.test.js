/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';
import {Countries} from '../';
import _ from 'lodash';

const props = {
	data: {
		loading: false,
		countries: [{
			iso2Code: 'AA',
			name: 'First name',
		}, {
			iso2Code: 'BB',
			name: 'Second name',
		}]
	}
};

test('Renders countries list', () => {
	const component = renderer.create(
		<StaticRouter location="someLocation" context={{}}>
			<Countries {...props}/>
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
