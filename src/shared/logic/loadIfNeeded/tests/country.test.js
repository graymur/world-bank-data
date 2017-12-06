/* eslint-disable */
import country from '../country';

const match = {params: {iso2Code: 'AA'}};

test('Calls action creator if country is undefined', async () => {
	const actionCreator = jest.fn();
	country({match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
	expect(actionCreator.mock.calls[0][0]).toBe('AA');
});

test('Calls action creator if country\'s code and params code are different', async () => {
	const actionCreator = jest.fn();
	country({country: {iso2Code: 'BB'}, match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
	expect(actionCreator.mock.calls[0][0]).toBe('AA');
});

test('Does not call action creator if country is not empty', async () => {
	const actionCreator = jest.fn();
	country({country: {iso2Code: 'AA'}, match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(0);
});
