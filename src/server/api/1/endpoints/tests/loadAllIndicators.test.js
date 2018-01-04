/* eslint-disable */
import loadAllIndicators from '../loadAllIndicators';
const httpMocks = require('node-mocks-http');

jest.mock('server/dataSource');
import dataSource from 'server/dataSource';

jest.mock('server/api/1/models/Indicator');
import {IndicatorModel} from 'server/api/1/models/Indicator';

test('Returns results of dataSource.fetchIndicator call', async () => {
	const response = httpMocks.createResponse();

	await loadAllIndicators({query: {token: process.env.SECURITY_TOKEN}}, response);

	expect(response.statusCode).toBe(200);
	expect(JSON.parse(response._getData())).toEqual({inserted: 3});

	expect(dataSource.fetchIndicatorsFromWB.mock.calls.length).toBe(1);

	expect(IndicatorModel.remove.mock.calls.length).toBe(1);
	expect(IndicatorModel.remove.mock.calls[0][0]).toEqual({});

	expect(IndicatorModel.mock.calls.length).toBe(3);
	expect(IndicatorModel.mock.calls[0][0].id).toBe(1);
	expect(IndicatorModel.mock.calls[1][0].id).toBe(2);
	expect(IndicatorModel.mock.calls[2][0].id).toBe(3);

	expect(IndicatorModel.prototype.save.mock.calls.length).toBe(3);
});
