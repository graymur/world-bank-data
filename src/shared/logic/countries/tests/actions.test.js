/* eslint-disable */
import * as actions from '../actions';

test('loadCountries', () => {
	expect(actions.loadCountries()).toEqual({type: 'Countries.loadCountries'});
});

test('setCountriesLoading', () => {
	expect(actions.setCountriesLoading(true)).toEqual({type: 'Countries.setCountriesLoading', payload: true});
});

test('setCountries', () => {
	expect(actions.setCountries([1,2])).toEqual({type: 'Countries.setCountries', payload: [1,2]});
});
