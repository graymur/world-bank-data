/* eslint-disable */
import {loadIndicators} from '../../sagas/loadIndicators';
import * as actions from '../../actions';
import dataSource from 'shared/dataSource';

test('loadIndicators saga success', () => {
	const gen = loadIndicators(actions.loadIndicators());

	const putLoadingTrue = gen.next().value;
	expect(putLoadingTrue.PUT.action.type).toBe('Indicators.setIndicatorsLoading');
	expect(putLoadingTrue.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchIndicators);

	const putSetIndicators = gen.next([1, 2]).value;
	expect(putSetIndicators.PUT.action.type).toBe('Indicators.setIndicators');
	expect(putSetIndicators.PUT.action.payload).toEqual([1, 2]);

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Indicators.setIndicatorsLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);
});

test('loadIndicators saga error', () => {
	const gen = loadIndicators(actions.loadIndicators());

	const putLoadingTrue = gen.next().value;
	expect(putLoadingTrue.PUT.action.type).toBe('Indicators.setIndicatorsLoading');
	expect(putLoadingTrue.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchIndicators);

	const putErrorTrue = gen.next({error: true}).value;
	expect(putErrorTrue.PUT.action.type).toBe('Shared.setError');
	expect(putErrorTrue.PUT.action.error).toBe(true);

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Indicators.setIndicatorsLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);
});
