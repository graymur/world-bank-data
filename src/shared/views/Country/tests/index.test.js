/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';
import {Country} from '../';
import _ from 'lodash';

const props = {
	match: {
		params: {iso2Code: 'AA'}
	},
	loading: false,
	country: {
		iso2Code: 'AA',
		name: 'Country name',
		region: {value: 'Region name'},
		incomeLevel: {value: 'Income level'},
		capitalCity: 'City name'
	},
	indicators: [{
		id: '1',
		name: 'First indicator'
	}, {
		id: '2',
		name: 'Second indicator'
	}]
};

test('Renders country and indicators list', () => {
	const component = renderer.create(
		<StaticRouter location="someLocation" context={{}}>
			<Country {...props}/>
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Calls loadCountry prop if country is not set', () => {
	const thisProps = _.omit(props, 'country');

	thisProps.loadCountry = jest.fn();

	const component = renderer.create(
		<StaticRouter location="someLocation" context={{}}>
			<Country {...thisProps}/>
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	expect(thisProps.loadCountry.mock.calls.length).toBe(1);
	expect(thisProps.loadCountry.mock.calls[0][0]).toBe('AA');
});

test('Calls loadIndicators prop if indicators are not set', () => {
	const thisProps = _.omit(props, 'indicators');

	thisProps.indicators = [];
	thisProps.loadIndicators = jest.fn();

	const component = renderer.create(
		<StaticRouter location="someLocation" context={{}}>
			<Country {...thisProps}/>
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	expect(thisProps.loadIndicators.mock.calls.length).toBe(1);
});
