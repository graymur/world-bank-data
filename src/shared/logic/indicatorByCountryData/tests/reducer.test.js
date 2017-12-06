/* eslint-disable */
import * as actions from '../actions';
import reducer, {initialState} from '../reducer';

test('loadIndicatorByCountryData', () => {
	const state = reducer(initialState, actions.loadIndicatorByCountryData('AA', 'BB'));
	expect(state.indicator).toEqual(undefined);
	expect(state.error).toEqual(initialState.error);
	expect(state.loading).toBe(initialState.loading);
});

test('setIndicatorByCountryDataLoading', () => {
	const state = reducer(initialState, actions.setIndicatorByCountryDataLoading(true));
	expect(state.data).toEqual(initialState.data);
	expect(state.error).toEqual(initialState.error);
	expect(state.loading).toBe(true);
});

test('setIndicatorByCountryDataLoadingError', () => {
	const state = reducer(initialState, actions.setIndicatorByCountryDataLoadingError('Some error'));
	expect(state.data).toEqual(initialState.data);
	expect(state.error).toEqual('Some error');
	expect(state.loading).toBe(initialState.loading);
});

test('setIndicatorByCountryData', () => {
	const state = reducer(initialState, actions.setIndicatorByCountryData({1:1}));
	expect(state.data).toEqual({1:1});
	expect(state.error).toEqual(initialState.error);
	expect(state.loading).toBe(initialState.loading);
});
