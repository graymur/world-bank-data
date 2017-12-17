/* eslint-disable */
import * as actions from '../actions';
import reducer, {initialState} from '../reducer';

test('loadIndicator', () => {
	const state = reducer(initialState, actions.loadIndicator('AA'));
	expect(state.indicator).toEqual(undefined);
	expect(state.error).toEqual(initialState.error);
	expect(state.loading).toBe(initialState.loading);
});

test('setIndicatorLoading', () => {
	const state = reducer(initialState, actions.setIndicatorLoading(true));
	expect(state.indicator).toEqual(initialState.indicator);
	expect(state.error).toEqual(initialState.error);
	expect(state.loading).toBe(true);
});

test('setIndicator', () => {
	const state = reducer(initialState, actions.setIndicator({1:1}));
	expect(state.indicator).toEqual({1:1});
	expect(state.error).toEqual(initialState.error);
	expect(state.loading).toBe(initialState.loading);
});
