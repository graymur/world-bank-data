/* eslint-disable */
import {suggestIndicatorData} from '../../sagas/suggestIndicatorData';
import * as actions from '../../actions';
import dataSource from 'shared/dataSource';

test('suggestIndicatorData saga success', () => {
	const gen = suggestIndicatorData(actions.loadIndicatorData('1', 1900));

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchIndicatorDataByYear);
	expect(callDataSource.CALL.args[0]).toBe('1');
	expect(callDataSource.CALL.args[1]).toBe(1900);

	const setSuggestIndicatorData = gen.next([1, 2, 3]).value;
	expect(setSuggestIndicatorData.PUT.action.type).toBe('Indicator.setSuggestIndicatorData');
	expect(setSuggestIndicatorData.PUT.action.payload).toEqual({
		year: 1900,
		data: [1, 2, 3]
	});

	gen.next();
	expect(gen.next().done).toBe(true);
});

test('loadIndicatorData saga error', () => {
	const gen = suggestIndicatorData(actions.loadIndicatorData('1', 1900));

	const callDataSource = gen.next().value;
	expect(callDataSource.CALL.fn).toBe(dataSource.fetchIndicatorDataByYear);
	expect(callDataSource.CALL.args[0]).toBe('1');
	expect(callDataSource.CALL.args[1]).toBe(1900);

	gen.next();
	expect(gen.next().done).toBe(true);
});
