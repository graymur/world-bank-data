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
