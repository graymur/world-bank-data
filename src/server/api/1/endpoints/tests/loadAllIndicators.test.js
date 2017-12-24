/* eslint-disable */
import loadAllIndicators from '../loadAllIndicators';
const httpMocks = require('node-mocks-http');

const fetchIndicatorsFromWB = jest.fn();

fetchIndicatorsFromWB.mockReturnValue([
	{id: 1},
	{id: 2},
	{id: 3}
]);

const dataSource = {fetchIndicatorsFromWB};

const IndicatorModel = jest.fn();

const save = jest.fn();
save.mockReturnValue(Promise.resolve(true));
IndicatorModel.prototype.save = save;

const remove = jest.fn();
IndicatorModel.remove = remove;

test('Returns results of dataSource.fetchIndicator call', async () => {
	const response = httpMocks.createResponse();

	await loadAllIndicators(dataSource, IndicatorModel)({
		query: {
			token: process.env.SECURITY_TOKEN
		}
	}, response);


	expect(remove.mock.calls.length).toBe(1);
	expect(remove.mock.calls[0][0]).toEqual({});

	expect(IndicatorModel.mock.calls.length).toBe(3);
	expect(IndicatorModel.mock.calls[0][0].id).toBe(1);
	expect(IndicatorModel.mock.calls[1][0].id).toBe(2);
	expect(IndicatorModel.mock.calls[2][0].id).toBe(3);

	expect(save.mock.calls.length).toBe(3);
});
