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

	const putSetCountries = gen.next([1, 2]).value;
	expect(putSetCountries.PUT.action.type).toBe('Countries.setCountries');
	expect(putSetCountries.PUT.action.payload).toEqual([1, 2]);

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Countries.setCountriesLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);

	gen.next();
	expect(gen.next().done).toBe(true);
});

test('loadCountries saga error', () => {
	const gen = loadCountries(actions.loadCountries());

	const putLoadingTrue = gen.next().value;
	expect(putLoadingTrue.PUT.action.type).toBe('Countries.setCountriesLoading');
	expect(putLoadingTrue.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchCountries);

	const putErrorTrue = gen.next({error: true}).value;
	expect(putErrorTrue.PUT.action.type).toBe('Shared.setError');
	expect(putErrorTrue.PUT.action.error).toBe(true);

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Countries.setCountriesLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);

	gen.next();
	expect(gen.next().done).toBe(true);
});
