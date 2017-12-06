/* eslint-disable */
import {loadIndicatorByCountryData} from '../../sagas/loadIndicatorByCountryData';
import * as actions from '../../actions';
import dataSource from 'shared/dataSource';

test('loadIndicator saga success', () => {
	const gen = loadIndicatorByCountryData(actions.loadIndicatorByCountryData('AA', 'BB'));

	const putLoadingTrue = gen.next().value;
	expect(putLoadingTrue.PUT.action.type).toBe('IBCD.setIBCDLoading');
	expect(putLoadingTrue.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchIndicatorByCountryData);
	expect(callDataSource.CALL.args[0]).toBe('AA');
	expect(callDataSource.CALL.args[1]).toBe('BB');

	const putErrorFalse = gen.next({1:1}).value;
	expect(putErrorFalse.PUT.action.type).toBe('IBCD.setIBCDLoadingError');
	expect(putErrorFalse.PUT.action.payload).toBe(false);

	const putSetIndicator = gen.next().value;
	expect(putSetIndicator.PUT.action.type).toBe('IBCD.setIBCD');
	expect(putSetIndicator.PUT.action.payload).toEqual({1:1});

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('IBCD.setIBCDLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);
});

test('loadIndicator saga error', () => {
	const gen = loadIndicatorByCountryData(actions.loadIndicatorByCountryData('AA', 'BB'));

	const putLoadingTrue = gen.next().value;
	expect(putLoadingTrue.PUT.action.type).toBe('IBCD.setIBCDLoading');
	expect(putLoadingTrue.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchIndicatorByCountryData);
	expect(callDataSource.CALL.args[0]).toBe('AA');
	expect(callDataSource.CALL.args[1]).toBe('BB');

	const putErrorTrue = gen.next({error: true}).value;
	expect(putErrorTrue.PUT.action.type).toBe('IBCD.setIBCDLoadingError');
	expect(putErrorTrue.PUT.action.error).toBe(true);

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('IBCD.setIBCDLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);
});
