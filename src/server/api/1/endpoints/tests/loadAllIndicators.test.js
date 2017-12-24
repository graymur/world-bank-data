/* eslint-disable */
import loadAllIndicators from '../loadAllIndicators';
const httpMocks = require('node-mocks-http');

jest.mock('server/dataSource', () => {
	const fetchIndicatorsFromWB = jest.fn();

	fetchIndicatorsFromWB.mockReturnValue([
		{id: 1},
		{id: 2},
		{id: 3}
	]);

	return {fetchIndicatorsFromWB};
});

import dataSource from 'server/dataSource';

jest.mock('server/api/1/models/Indicator', () => {
	const IndicatorModel = jest.fn();

	IndicatorModel.prototype.save = jest.fn();
	IndicatorModel.prototype.save.mockReturnValue(Promise.resolve(1));
	IndicatorModel.remove = jest.fn();

	return {IndicatorModel};
});

import {IndicatorModel} from 'server/api/1/models/Indicator';

test('Returns results of dataSource.fetchIndicator call', async () => {
	const response = httpMocks.createResponse();

	await loadAllIndicators({
		query: {
			token: process.env.SECURITY_TOKEN
		}
	}, response);

	expect(response.statusCode).toBe(200);
	expect(response._getData()).toBe('{"inserted":3}');

	expect(dataSource.fetchIndicatorsFromWB.mock.calls.length).toBe(1);

	expect(IndicatorModel.remove.mock.calls.length).toBe(1);
	expect(IndicatorModel.remove.mock.calls[0][0]).toEqual({});

	expect(IndicatorModel.mock.calls.length).toBe(3);
	expect(IndicatorModel.mock.calls[0][0].id).toBe(1);
	expect(IndicatorModel.mock.calls[1][0].id).toBe(2);
	expect(IndicatorModel.mock.calls[2][0].id).toBe(3);

	expect(IndicatorModel.prototype.save.mock.calls.length).toBe(3);
});
