/* eslint-disable */
import * as selectors from '../selectors';
import {INDICATOR_REDUCER_KEY} from '../reducer';

const state = {
	[INDICATOR_REDUCER_KEY]: {
		loading: true,
		indicator: {1: 1},
		currentYear: 1900,
		dataLoading: true,
		data: [1, 2, 3],
		suggestData: {
			1900: [1, 2, 3]
		},
	}
};

test('selectLoading', () => {
	expect(selectors.loading(state)).toBe(true);
});

test('selectIndicator', () => {
	expect(selectors.indicator(state)).toEqual({1: 1});
});

test('currentYear', () => {
	expect(selectors.currentYear(state)).toEqual(1900);
});

test('indicatorDataLoading', () => {
	expect(selectors.dataLoading(state)).toEqual(true);
});

test('data', () => {
	expect(selectors.data(state)).toEqual([1, 2, 3]);
});

test('suggestData', () => {
	expect(selectors.suggestData(state)).toEqual({1900: [1, 2, 3]});
});
