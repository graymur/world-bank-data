/* eslint-disable */
import countries from '../countries';

test('Calls action creator if countries are undefined', async () => {
	const actionCreator = jest.fn();
	countries({}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
});

test('Calls action creator if countries array is empty', async () => {
	const actionCreator = jest.fn();
	countries({countries: []}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
});

test('Does not call action creator if countries array is not empty', async () => {
	const actionCreator = jest.fn();
	countries({countries: [1]}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(0);
});
