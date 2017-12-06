/* eslint-disable */
import {loadCountry} from '../../sagas/loadCountry';
import * as actions from '../../actions';
import dataSource from 'shared/dataSource';

test('loadCountry saga success', () => {
	const gen = loadCountry(actions.loadCountry('AA'));

	const putLoadingTrue = gen.next().value;
	expect(putLoadingTrue.PUT.action.type).toBe('Country.setCountryLoading');
	expect(putLoadingTrue.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchCountry);
	expect(callDataSource.CALL.args[0]).toBe('AA');

	const putErrorFalse = gen.next({1:1}).value;
	expect(putErrorFalse.PUT.action.type).toBe('Country.setCountryLoadingError');
	expect(putErrorFalse.PUT.action.payload).toBe(false);

	const putSetCountry = gen.next().value;
	expect(putSetCountry.PUT.action.type).toBe('Country.setCountry');
	expect(putSetCountry.PUT.action.payload).toEqual({1:1});

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Country.setCountryLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);
});

test('loadCountry saga error', () => {
	const gen = loadCountry(actions.loadCountry('AA'));

	const putLoadingTrue = gen.next().value;
	expect(putLoadingTrue.PUT.action.type).toBe('Country.setCountryLoading');
	expect(putLoadingTrue.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchCountry);

	const putErrorTrue = gen.next({error: true}).value;
	expect(putErrorTrue.PUT.action.type).toBe('Country.setCountryLoadingError');
	expect(putErrorTrue.PUT.action.error).toBe(true);

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Country.setCountryLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);
});
