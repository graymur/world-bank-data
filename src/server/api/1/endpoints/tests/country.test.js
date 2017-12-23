/* eslint-disable */
import country from '../country';
const httpMocks = require('node-mocks-http');

const fetchCountry = jest.fn();
const dataSource = {fetchCountry};

test('Returns results of dataSource.fetchCountry call', async () => {
	const response = httpMocks.createResponse();
	await country(dataSource)({params: {iso2Code: 'AA'}}, response);
	expect(response.statusCode).toBe(200);
	expect(fetchCountry.mock.calls.length).toBe(1);
	expect(fetchCountry.mock.calls[0][0]).toBe('AA');
});
