/* eslint-disable */
import * as actions from '../actions';
import reducer, {initialState} from '../reducer';

test('setCountriesLoading', () => {
	const state = reducer(initialState, actions.setCountriesLoading(true));
	expect(state.countries).toEqual(initialState.countries);
	expect(state.error).toEqual(undefined);
	expect(state.loading).toBe(true);
});

test('setCountriesLoadingError', () => {
	const state = reducer(initialState, actions.setCountriesLoadingError('Some error'));
	expect(state.countries).toEqual(initialState.countries);
	expect(state.error).toEqual('Some error');
	expect(state.loading).toBe(false);
});

test('setCountries', () => {
	const state = reducer(initialState, actions.setCountries([1,2]));
	expect(state.countries).toEqual([1,2]);
	expect(state.error).toEqual(undefined);
	expect(state.loading).toBe(false);
});
