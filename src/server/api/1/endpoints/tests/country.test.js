/* eslint-disable */
import country from '../country';
const httpMocks = require('node-mocks-http');
jest.mock('server/dataSource');
import dataSource from 'server/dataSource';

test('Returns results of dataSource.fetchCountry call', async () => {
	const response = httpMocks.createResponse();
	await country({params: {iso2Code: 'AA'}}, response);

	expect(response.statusCode).toBe(200);
	expect(response._getData()).toBe('"COUNTRY"');
	expect(dataSource.fetchCountry.mock.calls.length).toBe(1);
	expect(dataSource.fetchCountry.mock.calls[0][0]).toBe('AA');
});
