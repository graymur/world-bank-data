import withCache from 'server/api/1/util/withCache';
import aggregatedRegionsISOCodes from 'shared/data/aggregatedRegionsISOCodes.json';
import _ from 'lodash';

const urlBase = 'https://api.worldbank.org/v2';
const defaultTTL = {days: 30};

export default {
	fetchCountries: async (limit = 1000) => {
		const result = await withCache(`${urlBase}/countries?per_page=${limit}&format=json`, defaultTTL);
		return result[1]
			.filter(x => x.region.iso2code !== 'NA')
			.map(x => _.pick(x, ['iso2Code', 'name']))
			.sort((a, b) => a.name > b.name ? 1 : -1);
	},
	fetchCountry: async (id) => {
		const result = await withCache(`${urlBase}/countries/${id}?format=json`, defaultTTL);
		return result[1][0];
	},
	fetchIndicators: async () => {
		const indicators = require('shared/data/mainIndicators.json')
			.map(x => _.pick(x, ['id', 'name']))
			.sort((a, b) => a.name > b.name ? 1 : -1);
		return Promise.resolve(indicators);
	},
	fetchIndicator: async (id) => {
		const result = await withCache(`${urlBase}/indicators/${id}?format=json`, defaultTTL);
		return result[1][0];
	},
	fetchIndicatorByCountryData: async (iso2Code, indicatorId) => {
		const result = await withCache(`${urlBase}/countries/${iso2Code}/indicators/${indicatorId}?format=json`, defaultTTL);
		return (result[1] || []).map(x => ({date: x.date, value: x.value}));
	},
	fetchIndicatorDataByYear: async (indicatorId, year) => {
		const result = await withCache(
			`${urlBase}/countries/all/indicators/${indicatorId}?date=${year}:${year}&per_page=1000&format=json`,
			defaultTTL
		);

		return (result[1] || [])
			.filter(x => !aggregatedRegionsISOCodes.includes(x.country.id) && x.value !== null)
			.sort((a, b) => a.country.value > b.country.value ? -1 : 1)
			.sort((a, b) => a.value > b.value ? -1 : 1)
			.map(x => ({name: x.country.value, value: x.value}));
	},
	searchIndicators: async (pattern, limit = 10) => {
		const result = await withCache(`${urlBase}/indicators?per_page=${limit}&format=json`, defaultTTL);
		return result[1].sort((a, b) => a.name > b.name ? 1 : -1);
	}
};
