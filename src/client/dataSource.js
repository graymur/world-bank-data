import memoize from 'lodash/memoize';

const urlBase = '/api/1';

const request = async endpoint => {
	const response = await fetch(`${urlBase}/${endpoint}`);
	return response.json();
};

export default {
	fetchCountries: memoize(async () => request('countries')),
	fetchCountry: memoize(async (iso2Code) => request(`/countries/${iso2Code}`)),
	fetchIndicators: memoize(async () => request('/indicators')),
	fetchIndicator: memoize(async (indicatorId) => request(`/indicators/${indicatorId}`)),
	fetchIndicatorByCountryData: memoize(
		async (iso2Code, indicatorId) => request(`/indicators/${indicatorId}/country/${iso2Code}`),
		(iso2Code, indicatorId) => `${iso2Code}-${indicatorId}`
	),
	fetchIndicatorDataByYear: memoize(
		async (indicatorId, year) => request(`/indicators/${indicatorId}/year/${year}`),
		(indicatorId, year) => `${indicatorId}-${year}`
	),
	searchIndicators: memoize(async (pattern) => request(`/indicators/search?pattern=${encodeURIComponent(pattern)}`))
};
