/* eslint-disable */
import getMaxIndicatorYear from '../getMaxIndicatorYear';

test('gets correct year', () => {
	expect(getMaxIndicatorYear()).toBe((new Date()).getFullYear() - 1);
});
