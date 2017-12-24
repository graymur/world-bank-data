/* eslint-disable */
import indicatorByCountryData from '../indicatorByCountryData';
const httpMocks = require('node-mocks-http');

const fetchIndicatorByCountryData = jest.fn();
const dataSource = {fetchIndicatorByCountryData};

test('Returns results of dataSource.fetchIndicator call', async () => {
	const response = httpMocks.createResponse();

	await indicatorByCountryData(dataSource)({params: {
		indicatorId: '1',
		iso2Code: 'AA'
	}}, response);

	expect(response.statusCode).toBe(200);
	expect(fetchIndicatorByCountryData.mock.calls.length).toBe(1);
	expect(fetchIndicatorByCountryData.mock.calls[0][0]).toBe('AA');
	expect(fetchIndicatorByCountryData.mock.calls[0][1]).toBe('1');
});
