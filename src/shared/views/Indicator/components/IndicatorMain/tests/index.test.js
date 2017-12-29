/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import IndicatorMain from '../';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const props = {
	match: {
		params: {indicatorId: 1}
	},
	indicator: {
		id: 1,
		name: 'Indicator name',
		sourceNote: 'Source note',
		sourceOrganization: 'Source organization',
	},
	currentYear: 2000,
	years: [2000, 2001]
};

test('Renders preloader', () => {
	const thisProps = Object.assign({}, props);
	thisProps.loading = true;
	const component = renderer.create(<IndicatorMain {...thisProps}/>);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Renders indicator info', () => {
	const component = renderer.create(<IndicatorMain {...props}/>);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Handles year change', () => {
	const loadIndicatorData = jest.fn();

	const component = shallow(<IndicatorMain {...props} loadIndicatorData={loadIndicatorData}/>);
	component.find('#year').simulate('change', {target: {value: 2000}});

	expect(loadIndicatorData.mock.calls.length).toBe(1);
	expect(loadIndicatorData.mock.calls[0][0]).toBe(1);
	expect(loadIndicatorData.mock.calls[0][1]).toBe(2000);
});
