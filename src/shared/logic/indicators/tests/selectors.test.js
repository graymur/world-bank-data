/* eslint-disable */
import * as selectors from '../selectors';
import {INDICATORS_REDUCER_KEY} from '../reducer';

const state = {
	[INDICATORS_REDUCER_KEY]: {
		searchString: 'string'
	}
};

test('searchString', () => {
	expect(selectors.searchString(state)).toBe('string');
});
