/* eslint-disable */
import * as selectors from '../selectors';
import {COUNTRY_REDUCER_KEY} from '../reducer';

const state = {
	[COUNTRY_REDUCER_KEY]: {
		loading: true,
		country: {1:1}
	}
};

test('selectLoading', () => {
	expect(selectors.selectLoading(state)).toBe(true);
});

test('selectCountry', () => {
	expect(selectors.selectCountry(state)).toEqual({1:1});
});
