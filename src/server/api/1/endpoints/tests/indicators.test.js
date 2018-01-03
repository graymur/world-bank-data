/* eslint-disable */
import indicators from '../indicators';
const httpMocks = require('node-mocks-http');
jest.mock('server/dataSource');
import dataSource from 'server/dataSource';

test('Returns results of dataSource.fetchIndicators call', async () => {
	const response = httpMocks.createResponse();
	const result = await indicators({}, response);
	expect(response.statusCode).toBe(200);
	expect(response._getData()).toBe('"RESULT"');
	expect(dataSource.fetchIndicators.mock.calls.length).toBe(1);
});
