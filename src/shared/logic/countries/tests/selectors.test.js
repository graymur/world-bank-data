/* eslint-disable */
import * as selectors from '../selectors';
import {COUNTRIES_REDUCER_KEY} from '../reducer';

const state = {
	[COUNTRIES_REDUCER_KEY]: {
		loading: true,
		countries: [1, 2]
	}
};

test('selectLoading', () => {
	expect(selectors.selectLoading(state)).toBe(true);
});

test('selectCountries', () => {
	expect(selectors.selectCountries(state)).toEqual([1, 2]);
});
