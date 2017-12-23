/* eslint-disable */
import countries from '../countries';
const httpMocks = require('node-mocks-http');

jest.mock('server/dataSource', () => ({
	fetchCountries: () => [1, 2, 3]
}));

test('Returns results of dataSource.fetchCountries call', async () => {
	const response = httpMocks.createResponse();
	const result = await countries({}, response);
	expect(response.statusCode).toBe(200);
	expect(JSON.parse(response._getData())).toEqual([1, 2, 3]);
});
