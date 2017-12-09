import memoize from 'lodash/memoize';
import aggregatedRegionsISOCodes from 'shared/data/aggregatedRegionsISOCodes.json';

export default {
	fetchCountries: memoize(async () => {
		const response = await fetch('https://api.worldbank.org/v2/countries?per_page=1000&format=json');
		const result = await response.json();
		return result[1]
			.filter(x => x.region.iso2code !== 'NA')
			.sort((a, b) => a.name > b.name ? 1 : -1);
	}),
	fetchCountry: memoize(async (iso2Code) => {
		const response = await fetch(`https://api.worldbank.org/v2/countries/${iso2Code}?format=json`);
		const result = await response.json();
		return result[1][0];
	}),
	fetchIndicators: memoize(async () => {
		const indicators = require('shared/data/mainIndicators.json')
			.sort((a, b) => a.name > b.name ? 1 : -1);
		return Promise.resolve(indicators);
		// const response = await fetch('https://api.worldbank.org/v2/indicators?per_page=200&format=json');
		// const result = await response.json();
		// return result[1].sort((a, b) => a.name > b.name ? 1 : -1);
	}),
	fetchIndicator: memoize(async (indicatorId) => {
		const response = await fetch(`https://api.worldbank.org/v2/indicators/${indicatorId}?format=json`);
		const result = await response.json();
		return result[1][0];
	}),
	fetchIndicatorByCountryData: memoize(async (iso2Code, indicatorId) => {
		const response = await fetch(`https://api.worldbank.org/v2/countries/${iso2Code}/indicators/${indicatorId}?format=json`);
		const result = await response.json();
		return result[1];
	}, (iso2Code, indicatorId) => `${iso2Code}-${indicatorId}`),
	fetchIndicatorDataByYear: memoize(async (indicatorId, year) => {
		const response = await fetch(`https://api.worldbank.org/v2/countries/all/indicators/${indicatorId}?date=${year}:${year}&per_page=1000&format=json`);
		const result = await response.json();
		return (result[1] || [])
			.filter(x => !aggregatedRegionsISOCodes.includes(x.country.id) && x.value !== null)
			.sort((a, b) => a.country.value > b.country.value ? -1 : 1)
			.sort((a, b) => a.value > b.value ? -1 : 1)
			.map(x => ({name: x.country.value, value: x.value}));
	}, (indicatorId, year) => `${indicatorId}-${year}`)
};
