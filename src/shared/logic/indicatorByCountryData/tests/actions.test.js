/* eslint-disable */
import * as actions from '../actions';

test('loadIndicatorByCountryData with strings in payload', () => {
	const action = actions.loadIndicatorByCountryData('AA', 'BB');
	expect(action.type).toEqual('IBCD.loadIBCD');
	expect(action.payload).toEqual({iso2Code: 'AA', indicatorId: 'BB'});
});

test('loadIndicatorByCountryData with object in payload', () => {
	const action = actions.loadIndicatorByCountryData({params: {iso2Code: 'AA', indicatorId: 'BB'}});
	expect(action.payload).toEqual({iso2Code: 'AA', indicatorId: 'BB'});
});

test('setIndicatorByCountryDataLoading', () => {
	expect(actions.setIndicatorByCountryDataLoading(true))
		.toEqual({type: 'IBCD.setIBCDLoading', payload: true});
});

test('setIndicatorByCountryData', () => {
	expect(actions.setIndicatorByCountryData({1: 1})).toEqual({type: 'IBCD.setIBCD', payload: {1: 1}});
});
