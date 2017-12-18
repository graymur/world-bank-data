/* eslint-disable */
import * as actions from '../actions';
import reducer, {initialState} from '../reducer';

test('setIndicatorsLoading', () => {
	const state = reducer(initialState, actions.setIndicatorsLoading(true));
	expect(state.indicators).toEqual(initialState.indicators);
	expect(state.error).toEqual(undefined);
	expect(state.loading).toBe(true);
});

test('setIndicators', () => {
	const state = reducer(initialState, actions.setIndicators([1,2]));
	expect(state.indicators).toEqual([1,2]);
	expect(state.error).toEqual(undefined);
	expect(state.loading).toBe(false);
});
