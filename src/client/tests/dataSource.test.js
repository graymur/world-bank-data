/* eslint-disable */
import dataSource from '../dataSource';

test('should render an <span> tag', () => {
	expect(dataSource.fetchCountries).toBeInstanceOf(Function);
	expect(dataSource.fetchIndicators).toBeInstanceOf(Function);
	expect(dataSource.fetchIndicator).toBeInstanceOf(Function);
	expect(dataSource.fetchIndicatorByCountryData).toBeInstanceOf(Function);
	expect(dataSource.fetchIndicatorDataByYear).toBeInstanceOf(Function);
	expect(dataSource.searchIndicators).toBeInstanceOf(Function);
});