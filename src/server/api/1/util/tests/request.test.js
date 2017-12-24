/* eslint-disable */
import request from '../request';

jest.mock('node-fetch', () => (url, config = {}) => {
	const defaultOptions = {
		status: 200,
		json: async () => ({result: true})
	};

	const error404Result = [{
		"message": [{
			"id": "120",
			"key": "Invalid value",
			"value": "The provided parameter value is not valid"
		}]
	}];

	const responses = {
		'200': Object.assign({}, defaultOptions),
		'500': Object.assign({}, defaultOptions, {status: 500, statusText: 'Error 500'}),
		'404': Object.assign({
			status: 200,
			json: async () => error404Result
		}),
	};

	return responses[url];
});

test('Returns parsed JSON', async () => {
	const result = await request('200');
	expect(result.result).toBe(true);
});

test('Throws error if request fails', async () => {
	expect.assertions(2);

	try {
		await request('500');
	} catch (e) {
		expect(e.status).toEqual(500);
		expect(e.message).toEqual('Response failed: 500 Error 500');
	}
});

test('Throws 404 error if message is received from WB API', async () => {
	expect.assertions(1);

	try {
		await request('404');
	} catch (e) {
		expect(e.status).toEqual(404);
	}
});
