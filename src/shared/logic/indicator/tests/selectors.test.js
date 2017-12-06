/* eslint-disable */
import * as selectors from '../selectors';
import {INDICATOR_REDUCER_KEY} from '../reducer';

const state = {
	[INDICATOR_REDUCER_KEY]: {
		loading: true,
		indicator: {1:1}
	}
};

test('selectLoading', () => {
	expect(selectors.selectLoading(state)).toBe(true);
});

test('selectIndicator', () => {
	expect(selectors.selectIndicator(state)).toEqual({1:1});
});
