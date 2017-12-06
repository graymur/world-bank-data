/* eslint-disable */
import indicator from '../indicator';

const match = {params: {indicatorId: 'AA'}};

test('Calls action creator if indicator is undefined', async () => {
	const actionCreator = jest.fn();
	indicator({match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
	expect(actionCreator.mock.calls[0][0]).toBe('AA');
});

test('Calls action creator if indicators\'s id and params id are different', async () => {
	const actionCreator = jest.fn();
	indicator({indicator: {id: 'BB'}, match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
	expect(actionCreator.mock.calls[0][0]).toBe('AA');
});

test('Does not call action creator if country is not empty', async () => {
	const actionCreator = jest.fn();
	indicator({indicator: {id: 'AA'}, match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(0);
});
