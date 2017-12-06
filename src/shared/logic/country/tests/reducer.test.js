/* eslint-disable */
import * as actions from '../actions';
import reducer, {initialState} from '../reducer';

test('loadCountry', () => {
	const state = reducer(initialState, actions.loadCountry('AA'));
	expect(state.country).toEqual(undefined);
	expect(state.error).toEqual(initialState.error);
	expect(state.loading).toBe(initialState.loading);
});

test('setCountryLoading', () => {
	const state = reducer(initialState, actions.setCountryLoading(true));
	expect(state.country).toEqual(initialState.country);
	expect(state.error).toEqual(initialState.error);
	expect(state.loading).toBe(true);
});


test('setCountryLoadingError', () => {
	const state = reducer(initialState, actions.setCountryLoadingError('Some error'));
	expect(state.country).toEqual(initialState.country);
	expect(state.error).toEqual('Some error');
	expect(state.loading).toBe(initialState.loading);
});

test('setCountry', () => {
	const state = reducer(initialState, actions.setCountry({1:1}));
	expect(state.country).toEqual({1:1});
	expect(state.error).toEqual(initialState.error);
	expect(state.loading).toBe(initialState.loading);
});
