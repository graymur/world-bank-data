/* eslint-disable */
import withCache from '../withCache';

jest.mock('../request', () => (url, params = {}) => 'not cached');

jest.mock('../../models/RequestCache', () => {
	function RequestCacheModel() {
		this.save = () => {};
	}

	RequestCacheModel.findOne = ({url}) => {
		return url === 'cached'
			? {result: 'cached'}
			: false
	};

	RequestCacheModel.remove = () => {};

	return {RequestCacheModel};
});

test('Returns cached result', async () => {
	const result = await withCache('cached');
	expect(result).toBe('cached');
});

test('Calls request and returns it\'s result', async () => {
	const result = await withCache('not cached');
	expect(result).toBe('not cached');
});
