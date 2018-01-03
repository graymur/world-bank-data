/* eslint-disable */
import indicatorByCountryData from '../indicatorByCountryData';
const httpMocks = require('node-mocks-http');
jest.mock('server/dataSource');
import dataSource from 'server/dataSource';

test('Returns results of dataSource.fetchIndicatorByCountryData call', async () => {
	const response = httpMocks.createResponse();

	await indicatorByCountryData({params: {
		indicatorId: '1',
		iso2Code: 'AA'
	}}, response);

	expect(response.statusCode).toBe(200);
	expect(response._getData()).toBe('"RESULT"');
	expect(dataSource.fetchIndicatorByCountryData.mock.calls.length).toBe(1);
	expect(dataSource.fetchIndicatorByCountryData.mock.calls[0][0]).toBe('AA');
	expect(dataSource.fetchIndicatorByCountryData.mock.calls[0][1]).toBe('1');
});
