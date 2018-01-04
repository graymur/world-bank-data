/* eslint-disable */
import indicatorDataByYear from '../indicatorDataByYear';
const httpMocks = require('node-mocks-http');
jest.mock('server/dataSource');
import dataSource from 'server/dataSource';

test('Returns results of dataSource.fetchIndicator call', async () => {
	const response = httpMocks.createResponse();

	await indicatorDataByYear({params: {
		indicatorId: '1',
		year: 2000
	}}, response);

	expect(response.statusCode).toBe(200);
	expect(response._getData()).toBe('"INDICATOR DATA BY YEAR"');
	expect(dataSource.fetchIndicatorDataByYear.mock.calls.length).toBe(1);
	expect(dataSource.fetchIndicatorDataByYear.mock.calls[0][0]).toBe('1');
	expect(dataSource.fetchIndicatorDataByYear.mock.calls[0][1]).toBe(2000);
});
