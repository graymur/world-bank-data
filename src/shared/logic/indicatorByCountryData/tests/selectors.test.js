/* eslint-disable */
import * as selectors from '../selectors';
import {INDICATOR_BY_COUNTRY_DATA_REDUCER_KEY} from '../reducer';

const state = {
	[INDICATOR_BY_COUNTRY_DATA_REDUCER_KEY]: {
		loading: true,
		data: {1:1}
	}
};

test('selectLoading', () => {
	expect(selectors.selectLoading(state)).toBe(true);
});

test('selectIndicatorByCountryData', () => {
	expect(selectors.selectIndicatorByCountryData(state)).toEqual({1:1});
});
