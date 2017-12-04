import fetch from 'node-fetch';

export default {
	fetchCountries: async () => {
		const response = await fetch('http://api.worldbank.org/v2/countries?per_page=1000&format=json');
		const result = await response.json();
		return result[1].sort((a, b) => a.name > b.name ? 1 : -1);
	},
	fetchCountry: async (id) => {
		const response = await fetch(`http://api.worldbank.org/v2/countries/${id}?format=json`);
		const result = await response.json();
		return result[1][0];
	},
	fetchIndicators: async () => {
		const response = await fetch('http://api.worldbank.org/v2/indicators?per_page=200&format=json');
		const result = await response.json();
		return result[1].sort((a, b) => a.name > b.name ? 1 : -1);
	},
	fetchIndicator: async (id) => {
		const response = await fetch(`http://api.worldbank.org/v2/indicators/${id}?format=json`);
		const result = await response.json();
		return result[1][0];
	},
	fetchIndicatorByCountryData: async (iso2Code, indicatorId) => {
		console.log(`http://api.worldbank.org/v2/countries/${iso2Code}/indicators/${indicatorId}?format=json`);
		const response = await fetch(`http://api.worldbank.org/v2/countries/${iso2Code}/indicators/${indicatorId}?format=json`);
		const result = await response.json();
		return (result[1] || []).map(x => ({date: x.date, value: x.value}));
	}
};
