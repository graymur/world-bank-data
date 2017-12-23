/* eslint-disable */
import indicators from '../indicators';
const httpMocks = require('node-mocks-http');

const fetchIndicators = jest.fn();
const dataSource = {fetchIndicators};

test('Returns results of dataSource.fetchIndicators call', async () => {
	const response = httpMocks.createResponse();
	const result = await indicators(dataSource)({}, response);
	expect(response.statusCode).toBe(200);
	expect(fetchIndicators.mock.calls.length).toBe(1);
});
