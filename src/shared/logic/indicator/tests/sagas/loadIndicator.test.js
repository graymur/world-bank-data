/* eslint-disable */
import {loadIndicator} from '../../sagas/loadIndicator';
import * as actions from '../../actions';
import dataSource from 'shared/dataSource';

test('loadIndicator saga success', () => {
	const gen = loadIndicator(actions.loadIndicator('AA'));

	const putLoadingTrue = gen.next().value;
	expect(putLoadingTrue.PUT.action.type).toBe('Indicator.setIndicatorLoading');
	expect(putLoadingTrue.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchIndicator);
	expect(callDataSource.CALL.args[0]).toBe('AA');

	const putSetIndicator = gen.next({1:1}).value;
	expect(putSetIndicator.PUT.action.type).toBe('Indicator.setIndicator');
	expect(putSetIndicator.PUT.action.payload).toEqual({1:1});

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Indicator.setIndicatorLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);

	gen.next();
	expect(gen.next().done).toBe(true);
});

test('loadIndicator saga error', () => {
	const gen = loadIndicator(actions.loadIndicator('AA'));

	const putLoadingTrue = gen.next().value;
	expect(putLoadingTrue.PUT.action.type).toBe('Indicator.setIndicatorLoading');
	expect(putLoadingTrue.PUT.action.payload).toBe(true);

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchIndicator);

	const putErrorTrue = gen.next({error: true}).value;
	expect(putErrorTrue.PUT.action.type).toBe('Shared.setError');
	expect(putErrorTrue.PUT.action.error).toBe(true);

	const putLoadingFalse = gen.next().value;
	expect(putLoadingFalse.PUT.action.type).toBe('Indicator.setIndicatorLoading');
	expect(putLoadingFalse.PUT.action.payload).toBe(false);

	gen.next();
	expect(gen.next().done).toBe(true);
});
