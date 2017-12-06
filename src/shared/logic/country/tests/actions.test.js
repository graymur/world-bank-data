/* eslint-disable */
import * as actions from '../actions';

test('loadCountry with string as payload', () => {
	const action = actions.loadCountry('AA');
	expect(action.type).toEqual('Country.loadCountry');
	expect(action.payload).toEqual('AA');
});

test('loadCountry with match object as payload', () => {
	const action = actions.loadCountry({params: {iso2Code: 'AA'}});
	expect(action.payload).toEqual('AA');
});

test('setCountryLoading', () => {
	expect(actions.setCountryLoading(true)).toEqual({type: 'Country.setCountryLoading', payload: true});
});

test('setCountryLoadingError', () => {
	expect(actions.setCountryLoadingError('Error')).toEqual({type: 'Country.setCountryLoadingError', payload: 'Error'});
});

test('setCountry', () => {
	expect(actions.setCountry({1: 1})).toEqual({type: 'Country.setCountry', payload: {1: 1}});
});
