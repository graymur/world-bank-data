/* eslint-disable */
import * as selectors from '../selectors';
import {INDICATOR_REDUCER_KEY} from '../reducer';

const state = {
	[INDICATOR_REDUCER_KEY]: {
		currentYear: 1900,
	}
};

test('currentYear', () => {
	expect(selectors.currentYear(state)).toEqual(1900);
});
