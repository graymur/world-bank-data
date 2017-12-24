/* eslint-disable */
import withCache from '../withCache';

jest.mock('../request', () => (url, params = {}) => 'not cached');

const save = jest.fn();
const remove = jest.fn();

function RequestCacheModel() {
	this.save = save;
}

RequestCacheModel.findOne = ({url}) => {
	return url === 'cached'
		? {result: 'cached'}
		: false
};

RequestCacheModel.remove = remove;

test('Returns cached result', async () => {
	const result = await withCache(RequestCacheModel)('cached');
	expect(result).toBe('cached');
});

test('Calls request and returns it\'s result', async () => {
	const result = await withCache(RequestCacheModel)('not cached');
	expect(result).toBe('not cached');
	expect(remove.mock.calls.length).toBe(1);
	expect(remove.mock.calls[0][0]).toEqual({url: 'not cached'});
	expect(save.mock.calls.length).toBe(1);
});
