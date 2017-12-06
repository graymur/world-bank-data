/* eslint-disable */
import {loadCountries} from '../../sagas/loadCountries';
import * as actions from '../../actions';
import dataSource from 'shared/dataSource';

test('loadCountries saga success', () => {
	const gen = loadCountries(actions.loadCountries());

	const putLoadingTrue = gen.next().value;
	expect(putLoadingTrue.PUT.action.type).toBe('Countries.setCountriesLoading');
	expect(putLoadingTrue.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchCountries);

	const putErrorFalse = gen.next([1, 2]).value;
	expect(putErrorFalse.PUT.action.type).toBe('Countries.setCountriesLoadingError');
	expect(putErrorFalse.PUT.action.payload).toBe(false);

	const putSetCountries = gen.next().value;
	expect(putSetCountries.PUT.action.type).toBe('Countries.setCountries');
	expect(putSetCountries.PUT.action.payload).toEqual([1, 2]);

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Countries.setCountriesLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);
});

test('loadCountries saga error', () => {
	const gen = loadCountries(actions.loadCountries());

	const putLoadingTrue = gen.next().value;
	expect(putLoadingTrue.PUT.action.type).toBe('Countries.setCountriesLoading');
	expect(putLoadingTrue.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchCountries);

	const putErrorTrue = gen.next({error: true}).value;
	expect(putErrorTrue.PUT.action.type).toBe('Countries.setCountriesLoadingError');
	expect(putErrorTrue.PUT.action.error).toBe(true);

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Countries.setCountriesLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);
});
