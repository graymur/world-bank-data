/* eslint-disable */
import indicators from '../indicators';
const httpMocks = require('node-mocks-http');

jest.mock('server/dataSource', () => ({
	fetchIndicators: () => [1, 2, 3]
}));

test('Returns results of dataSource.fetchIndicators call', async () => {
	const response = httpMocks.createResponse();
	const result = await indicators({}, response);
	expect(response.statusCode).toBe(200);
	expect(JSON.parse(response._getData())).toEqual([1, 2, 3]);
});
