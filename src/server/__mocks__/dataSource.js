/* eslint-disable */

const dataSource = () => {
	const fetchCountry = jest.fn();
	fetchCountry.mockReturnValue('RESULT');

	const fetchCountries = jest.fn();
	fetchCountries.mockReturnValue('RESULT');

	const fetchIndicator = jest.fn();
	fetchIndicator.mockReturnValue('RESULT');

	const fetchIndicatorByCountryData = jest.fn();
	fetchIndicatorByCountryData.mockReturnValue('RESULT');

	const fetchIndicatorDataByYear = jest.fn();
	fetchIndicatorDataByYear.mockReturnValue('RESULT');

	const fetchIndicators = jest.fn();
	fetchIndicators.mockReturnValue('RESULT');

	const fetchIndicatorsFromWB = jest.fn();
	fetchIndicatorsFromWB.mockReturnValue([
		{id: 1},
		{id: 2},
		{id: 3}
	]);

	return {
		fetchCountry,
		fetchCountries,
		fetchIndicator,
		fetchIndicatorByCountryData,
		fetchIndicatorDataByYear,
		fetchIndicators,
		fetchIndicatorsFromWB
	};
};

export default dataSource();
