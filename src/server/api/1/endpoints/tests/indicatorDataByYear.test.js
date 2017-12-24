/* eslint-disable */
import indicatorDataByYear from '../indicatorDataByYear';
const httpMocks = require('node-mocks-http');

const fetchIndicatorDataByYear = jest.fn();
const dataSource = {fetchIndicatorDataByYear};

test('Returns results of dataSource.fetchIndicator call', async () => {
	const response = httpMocks.createResponse();

	await indicatorDataByYear(dataSource)({params: {
		indicatorId: '1',
		year: 2000
	}}, response);

	expect(response.statusCode).toBe(200);
	expect(fetchIndicatorDataByYear.mock.calls.length).toBe(1);
	expect(fetchIndicatorDataByYear.mock.calls[0][0]).toBe('1');
	expect(fetchIndicatorDataByYear.mock.calls[0][1]).toBe(2000);
});
