/* eslint-disable */
import * as selectors from '../selectors';
import {INDICATORS_REDUCER_KEY} from '../reducer';

const state = {
	[INDICATORS_REDUCER_KEY]: {
		loading: true,
		indicators: [1, 2]
	}
};

test('selectLoading', () => {
	expect(selectors.selectLoading(state)).toBe(true);
});

test('selectIndicators', () => {
	expect(selectors.selectIndicators(state)).toEqual([1, 2]);
});
