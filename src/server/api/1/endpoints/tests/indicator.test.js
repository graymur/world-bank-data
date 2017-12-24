/* eslint-disable */
import indicator from '../indicator';
const httpMocks = require('node-mocks-http');

const fetchIndicator = jest.fn();
const dataSource = {fetchIndicator};

test('Returns results of dataSource.fetchIndicator call', async () => {
	const response = httpMocks.createResponse();
	await indicator(dataSource)({params: {indicatorId: '1'}}, response);
	expect(response.statusCode).toBe(200);
	expect(fetchIndicator.mock.calls.length).toBe(1);
	expect(fetchIndicator.mock.calls[0][0]).toBe('1');
});
