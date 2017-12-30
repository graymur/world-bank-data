/* eslint-disable */
import {loadIndicatorData} from '../../sagas/loadIndicatorData';
import * as actions from '../../actions';
import dataSource from 'shared/dataSource';

test('loadIndicatorData saga success', () => {
	const gen = loadIndicatorData(actions.loadIndicatorData('1', 1900));

	const putCurrentYear = gen.next().value;
	expect(putCurrentYear.PUT.action.type).toBe('Indicator.setCurrentYear');
	expect(putCurrentYear.PUT.action.payload).toBe(1900);

	const putIndicatorDataLoading = gen.next().value;
	expect(putIndicatorDataLoading.PUT.action.type).toBe('Indicator.setIndicatorDataLoading');
	expect(putIndicatorDataLoading.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchIndicatorDataByYear);
	expect(callDataSource.CALL.args[0]).toBe('1');
	expect(callDataSource.CALL.args[1]).toBe(1900);

	const putSetIndicatorData = gen.next([1, 2, 3]).value;
	expect(putSetIndicatorData.PUT.action.type).toBe('Indicator.setIndicatorData');
	expect(putSetIndicatorData.PUT.action.payload).toEqual([1, 2, 3]);

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Indicator.setIndicatorDataLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);

	gen.next();
	expect(gen.next().done).toBe(true);
});

test('loadIndicatorData saga suggest', () => {
	const gen = loadIndicatorData(actions.loadIndicatorData('1', 1900));

	const putCurrentYear = gen.next().value;
	expect(putCurrentYear.PUT.action.type).toBe('Indicator.setCurrentYear');
	expect(putCurrentYear.PUT.action.payload).toBe(1900);

	const putIndicatorDataLoading = gen.next().value;
	expect(putIndicatorDataLoading.PUT.action.type).toBe('Indicator.setIndicatorDataLoading');
	expect(putIndicatorDataLoading.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchIndicatorDataByYear);
	expect(callDataSource.CALL.args[0]).toBe('1');
	expect(callDataSource.CALL.args[1]).toBe(1900);

	const putSetIndicatorData = gen.next([]).value;
	expect(putSetIndicatorData.PUT.action.type).toBe('Indicator.setIndicatorData');
	expect(putSetIndicatorData.PUT.action.payload).toEqual([]);

	const years = [1897, 1898, 1899, 1901, 1902, 1903];

	for (const year of years) {
		const putSuggestIndicatorData = gen.next().value;
		expect(putSuggestIndicatorData.PUT.action.type).toBe('Indicator.suggestIndicatorData');
		expect(putSuggestIndicatorData.PUT.action.payload).toEqual({indicatorId: '1', year});
	}

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Indicator.setIndicatorDataLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);

	gen.next();
	expect(gen.next().done).toBe(true);
});

test('loadIndicatorData saga error', () => {
	const gen = loadIndicatorData(actions.loadIndicatorData('1', 1900));

	const putCurrentYear = gen.next().value;
	expect(putCurrentYear.PUT.action.type).toBe('Indicator.setCurrentYear');
	expect(putCurrentYear.PUT.action.payload).toBe(1900);

	const putIndicatorDataLoading = gen.next().value;
	expect(putIndicatorDataLoading.PUT.action.type).toBe('Indicator.setIndicatorDataLoading');
	expect(putIndicatorDataLoading.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchIndicatorDataByYear);
	expect(callDataSource.CALL.args[0]).toBe('1');
	expect(callDataSource.CALL.args[1]).toBe(1900);

	const putErrorTrue = gen.next({error: true}).value;
	expect(putErrorTrue.PUT.action.type).toBe('Shared.setError');
	expect(putErrorTrue.PUT.action.error).toBe(true);

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Indicator.setIndicatorDataLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);

	gen.next();
	expect(gen.next().done).toBe(true);
});
