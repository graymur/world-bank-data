/* eslint-disable */
import indicator from '../indicator';
const httpMocks = require('node-mocks-http');
jest.mock('server/dataSource');
import dataSource from 'server/dataSource';

test('Returns results of dataSource.fetchIndicator call', async () => {
	const response = httpMocks.createResponse();
	await indicator({params: {indicatorId: '1'}}, response);
	expect(response.statusCode).toBe(200);
	expect(response._getData()).toBe('"RESULT"');
	expect(dataSource.fetchIndicator.mock.calls.length).toBe(1);
	expect(dataSource.fetchIndicator.mock.calls[0][0]).toBe('1');
});
