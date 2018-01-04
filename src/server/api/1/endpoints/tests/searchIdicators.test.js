/* eslint-disable */
import searchIndicators from '../searchIndicators';
const httpMocks = require('node-mocks-http');
jest.mock('server/dataSource');
import dataSource from 'server/dataSource';

test('Returns results of dataSource.searchIndicators call', async () => {
	const response = httpMocks.createResponse();
	await searchIndicators({query: {pattern: 'xxx'}}, response);

	expect(response.statusCode).toBe(200);
	expect(JSON.parse(response._getData())).toEqual(dataSource.searchIndicatorsPayload);
	expect(dataSource.searchIndicators.mock.calls.length).toBe(1);
});

test('Returns error 500 if pattern is empty', async () => {
	const response = httpMocks.createResponse();
	await searchIndicators({query: {}}, response);

	expect(response.statusCode).toBe(500);
	console.log(response._getData().error);
	expect(response._getData().error).toBe('Search pattern should be at least 3 characters long');
	expect(dataSource.searchIndicators.mock.calls.length).toBe(1);
});

test('Returns error 500 if pattern is less then 3 characters long', async () => {
	const response = httpMocks.createResponse();
	await searchIndicators({query: {pattern: 'xx'}}, response);

	expect(response.statusCode).toBe(500);
	console.log(response._getData().error);
	expect(response._getData().error).toBe('Search pattern should be at least 3 characters long');
	expect(dataSource.searchIndicators.mock.calls.length).toBe(1);
});
