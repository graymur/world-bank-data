/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';
import CountriesMain from 'shared/views/Countries/components/CountriesMain';

const countries = [{
	iso2Code: 'AA',
	name: 'Country AA'
}, {
	iso2Code: 'BB',
	name: 'Country BB'
}];

test('Shows loading sign', () => {
	const component = renderer.create(
		<StaticRouter location="someLocation" context={{}}>
			<CountriesMain loading={Boolean(true)}/>
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Shows countries list', () => {
	const component = renderer.create(
		<StaticRouter location="someLocation" context={{}}>
			<CountriesMain loading={Boolean(false)} countries={countries}/>
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});