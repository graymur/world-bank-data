/* eslint-disable */
import indicators from '../indicators';

test('Calls action creator if indicators are undefined', async () => {
	const actionCreator = jest.fn();
	indicators({}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
});

test('Calls action creator if indicators array is empty', async () => {
	const actionCreator = jest.fn();
	indicators({countries: []}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
});

test('Does not call action creator if indicators array is not empty', async () => {
	const actionCreator = jest.fn();
	indicators({indicators: [1]}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(0);
});
