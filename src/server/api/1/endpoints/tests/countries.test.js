/* eslint-disable */
import countries from '../countries';
const httpMocks = require('node-mocks-http');

const fetchCountries = jest.fn();
const dataSource = {fetchCountries};

test('Returns results of dataSource.fetchCountries call', async () => {
	const response = httpMocks.createResponse();
	const result = await countries(dataSource)({}, response);
	expect(response.statusCode).toBe(200);
	expect(fetchCountries.mock.calls.length).toBe(1);
});
