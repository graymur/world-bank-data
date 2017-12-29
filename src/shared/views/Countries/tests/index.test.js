/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';
import {Countries} from '../';
import _ from 'lodash';

const props = {
	loading: false,
	countries: [{
		iso2Code: 'AA',
		name: 'First name',
	}, {
		iso2Code: 'BB',
		name: 'Second name',
	}]
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

test('Calls loadCountries prop if countries array is empty', () => {
	const thisProps = _.omit(props, 'countries');

	thisProps.loadCountries = jest.fn();
	thisProps.countries = [];

	const component = renderer.create(
		<StaticRouter location="someLocation" context={{}}>
			<Countries {...thisProps}/>
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	expect(thisProps.loadCountries.mock.calls.length).toBe(1);
});
