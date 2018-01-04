/* eslint-disable */

const dataSource = () => {
	const searchIndicatorsPayload = [
		{id: 11},
		{id: 22},
		{id: 33}
	];

	const fetchIndicatorsFromWBPayload = [
		{id: 1},
		{id: 2},
		{id: 3}
	];

	const fetchCountry = jest.fn();
	fetchCountry.mockReturnValue('COUNTRY');

	const fetchCountries = jest.fn();
	fetchCountries.mockReturnValue('COUNTRIES');

	const fetchIndicator = jest.fn();
	fetchIndicator.mockReturnValue('INDICATOR');

	const fetchIndicatorByCountryData = jest.fn();
	fetchIndicatorByCountryData.mockReturnValue('INDICATOR BY COUNTRY DATA');

	const fetchIndicatorDataByYear = jest.fn();
	fetchIndicatorDataByYear.mockReturnValue('INDICATOR DATA BY YEAR');

	const fetchIndicators = jest.fn();
	fetchIndicators.mockReturnValue('INDICATORS');

	const fetchIndicatorsFromWB = jest.fn();
	fetchIndicatorsFromWB.mockReturnValue(fetchIndicatorsFromWBPayload);

	const searchIndicators = jest.fn();
	searchIndicators.mockReturnValue(searchIndicatorsPayload);

	return {
		fetchCountry,
		fetchCountries,
		fetchIndicator,
		fetchIndicatorByCountryData,
		fetchIndicatorDataByYear,
		fetchIndicators,
		fetchIndicatorsFromWB,
		searchIndicators,
		searchIndicatorsPayload,
		fetchIndicatorsFromWBPayload
	};
};

export default dataSource();
