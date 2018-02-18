/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import {MockedProvider} from 'react-apollo/test-utils';
import IndicatorMain from '../';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

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
	currentYear: 2000,
	years: [2000, 2001],
	suggestData: {}
};

const getTree = (props, result = {}) => (
	<MockedProvider mocks={[
		{request: {query: '', variables: {cache: false}}, result: {data: result}}
	]}>
		<IndicatorMain {...props}/>
	</MockedProvider>
)

test('Renders preloader', () => {
	const thisProps = Object.assign({}, props);
	thisProps.loading = true;
	const component = renderer.create(getTree(thisProps));

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Renders indicator info', () => {
	const component = renderer.create(getTree(props, {}));

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Handles year change', () => {
	const changeYear = jest.fn();

	const component = shallow(<IndicatorMain {...props} changeYear={changeYear}/>);
	component.find('#year').simulate('change', {target: {value: 2000}});

	expect(changeYear.mock.calls.length).toBe(1);
	expect(changeYear.mock.calls[0][0]).toBe(2000);
});
