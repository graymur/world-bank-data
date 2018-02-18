/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import IndicatorData from '../';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SuggestData from '../../SuggestData'

configure({adapter: new Adapter()});

const props = {
	loading: false,
	data: [{
		name: 1,
		value: 1,
	}, {
		name: 2,
		value: 2,
	}]
};

test('Renders preloader', () => {
	const thisProps = Object.assign({}, props);
	thisProps.loading = true;
	const component = renderer.create(<IndicatorData loading={true}/>);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Renders data', () => {
	const thisProps = Object.assign({}, props);
	thisProps.loading = true;
	const component = shallow(<IndicatorData {...props}/>)

	expect(component.find('.indicator__data__chart').length).toBe(1)
	expect(component.find('.loader').length).toBe(0)
});

test('Renders data suggestion component', () => {
	const thisProps = Object.assign({}, props);
	thisProps.loading = true;
	const component = shallow(<IndicatorData loading={false} indicator={{id: '1'}} currentYear={2000} data={[]}/>);

	expect(component.find('.indicator__data__chart._empty').length).toBe(1)
	expect(component.find(SuggestData).length).toBe(1)
});
