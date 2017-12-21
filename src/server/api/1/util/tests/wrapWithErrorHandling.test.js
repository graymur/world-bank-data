/* eslint-disable */
import wrapWithErrorHandling from '../wrapWithErrorHandling';
import Error404 from '../Error404';
import _ from 'lodash';
const httpMocks = require('node-mocks-http');

test('Returns function', async () => {
	const wrapped = wrapWithErrorHandling(async () => 'result');
	expect(_.isFunction(wrapped)).toBeTruthy();
	expect(await wrapped()).toBe('result');
});

test('Catches 404 error', async () => {
	const handler = () => {
		throw new Error404('Some error');
	};

	const wrapped = wrapWithErrorHandling(handler);
	const response = httpMocks.createResponse();

	await wrapped({}, response);
	expect(response.statusCode).toBe(404);
	expect(response._getData().error).toBe('Not found');
});

test('Catches other error', async () => {
	const handler = () => {
		throw new Error('Some error');
	};

	const wrapped = wrapWithErrorHandling(handler);
	const response = httpMocks.createResponse();

	await wrapped({}, response);
	expect(response.statusCode).toBe(500);
	expect(response._getData().error).toBe('Some error');
});
