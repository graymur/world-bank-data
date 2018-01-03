/* eslint-disable */
import countries from '../countries';
const httpMocks = require('node-mocks-http');
jest.mock('server/dataSource');
import dataSource from 'server/dataSource';

test('Returns results of dataSource.fetchCountries call', async () => {
	const response = httpMocks.createResponse();
	const result = await countries({}, response);

	expect(response.statusCode).toBe(200);
	expect(response._getData()).toBe('"RESULT"');
	expect(dataSource.fetchCountries.mock.calls.length).toBe(1);
});
