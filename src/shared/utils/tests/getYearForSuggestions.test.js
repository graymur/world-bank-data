/* eslint-disable */
import getMaxIndicatorYear from '../getMaxIndicatorYear';
import getYearForSuggestions from '../getYearForSuggestions';

test('gets correct years', () => {
	expect(getYearForSuggestions(2000)).toEqual([1997, 1998, 1999, 2001, 2002, 2003]);
});

test('does not return year bigger then current', () => {
	const maxYear = getMaxIndicatorYear();
	expect(getYearForSuggestions(maxYear))
		.toEqual([maxYear - 3, maxYear - 2, maxYear - 1]);
});
