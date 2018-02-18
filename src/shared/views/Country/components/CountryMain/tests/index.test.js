/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';
import {MockedProvider} from 'react-apollo/test-utils';
import CountryMain from '../index';
import {indicatorsQuery} from 'shared/providers/Indicators'
import {addTypenameToDocument} from 'apollo-utilities';

const props = {
	loading: false,
	country: {
		iso2Code: 'AA',
		name: 'Country name',
		region: {value: 'Region name'},
		incomeLevel: {value: 'Income level'},
		capitalCity: 'City name'
	}
};

const indicators = [{
	id: 1,
	name: 'Indicator 1'
}, {
	id: 2,
	name: 'Indicator 2'
}]

test('Renders country and indicators list', () => {
	const component = renderer.create(
		<MockedProvider mocks={[
			{
				request: {
					query: addTypenameToDocument(indicatorsQuery),
					variable: {cache: false}
				},
				result: {data: {indicators}}
			}
		]}>
			<StaticRouter location="someLocation" context={{}}>
				<CountryMain {...props}/>
			</StaticRouter>
		</MockedProvider>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

