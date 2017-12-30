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
	const state = reducer(initialState, actions.setIndicator({1: 1}));
	expect(state.indicator).toEqual({1: 1});
	expect(state.error).toEqual(initialState.error);
	expect(state.loading).toBe(initialState.loading);
});

test('LOCATION_CHANGE', () => {
	const prevState = {...initialState, suggestData: {1: 1}};
	const state = reducer(prevState, {type: '@@router/LOCATION_CHANGE'});
	expect(state.suggestData).toEqual({});
});

test('loadIndicatorData', () => {
	const state = reducer(initialState, actions.loadIndicatorData('1', 1900));
	expect(state.currentYear).toEqual(1900);
	expect(state.data).toEqual(undefined);
});

test('setCurrentYear', () => {
	const state = reducer(initialState, actions.setCurrentYear(1900));
	expect(state.currentYear).toEqual(1900);
});

test('setIndicatorDataLoading', () => {
	const state1 = reducer(initialState, actions.setIndicatorDataLoading());
	expect(state1.dataLoading).toEqual(true);
	const state2 = reducer(initialState, actions.setIndicatorDataLoading(false));
	expect(state2.dataLoading).toEqual(false);
});

test('setIndicatorData', () => {
	const state = reducer(initialState, actions.setIndicatorData([1, 2, 3]));
	expect(state.data).toEqual([1, 2, 3]);
});

test('setSuggestIndicatorData', () => {
	const state1 = reducer(initialState, actions.setSuggestIndicatorData(1900, [1, 2, 3]));
	expect(state1.suggestData).toEqual({1900: [1, 2, 3]});

	const state2 = reducer(initialState, actions.setSuggestIndicatorData(1900, []));
	expect(state2.suggestData).toEqual({});
});
