/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';
import {Indicator} from '../';
import _ from 'lodash';

const props = {
	match: {
		params: {indicatorId: '1'}
	},
	indicator: {
		id: '1',
		name: 'Indicator name',
		sourceNote: 'Source note',
		sourceOrganization: 'Source organization',
	},
	years: [2000, 2001],
	suggestData: {}
};

test('Renders indicator info', () => {
	const component = renderer.create(
		<StaticRouter location="someLocation" context={{}}>
			<Indicator {...props}/>
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Calls loadIndicator prop if indicator is not set', () => {
	const thisProps = _.omit(props, 'indicator');

	thisProps.loadIndicator = jest.fn();

	const component = renderer.create(
		<StaticRouter location="someLocation" context={{}}>
			<Indicator {...thisProps}/>
		</StaticRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	expect(thisProps.loadIndicator.mock.calls.length).toBe(1);
	expect(thisProps.loadIndicator.mock.calls[0][0]).toBe('1');
});
