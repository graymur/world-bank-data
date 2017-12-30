/* eslint-disable */
import * as actions from '../actions';

test('loadIndicator with string as payload', () => {
	const action = actions.loadIndicator('AA');
	expect(action.type).toEqual('Indicator.loadIndicator');
	expect(action.payload).toEqual('AA');
});

test('loadIndicator with match object as payload', () => {
	const action = actions.loadIndicator({params: {indicatorId: 'AA'}});
	expect(action.payload).toEqual('AA');
});

test('setIndicatorLoading', () => {
	expect(actions.setIndicatorLoading(true)).toEqual({type: 'Indicator.setIndicatorLoading', payload: true});
});

test('setIndicator', () => {
	expect(actions.setIndicator({1: 1})).toEqual({type: 'Indicator.setIndicator', payload: {1: 1}});
});

test('setCurrentYear', () => {
	expect(actions.setCurrentYear(1900)).toEqual({type: 'Indicator.setCurrentYear', payload: 1900});
});

test('loadIndicatorData', () => {
	const result = {
		type: 'Indicator.loadIndicatorData',
		payload: {
			indicatorId: '1',
			year: 1900,
		}
	};

	expect(actions.loadIndicatorData('1', 1900)).toEqual(result);
});

test('loadIndicatorData by params', () => {
	const result = {
		type: 'Indicator.loadIndicatorData',
		payload: {
			indicatorId: '1',
			year: 1900,
		}
	};

	expect(actions.loadIndicatorData({params: {
		indicatorId: '1',
		year: 1900,
	}})).toEqual(result);
});

test('setIndicatorDataLoading', () => {
	expect(actions.setIndicatorDataLoading()).toEqual({type: 'Indicator.setIndicatorDataLoading', payload: true});
	expect(actions.setIndicatorDataLoading(false)).toEqual({type: 'Indicator.setIndicatorDataLoading', payload: false});
});
