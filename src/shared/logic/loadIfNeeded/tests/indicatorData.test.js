/* eslint-disable */
import indicator from '../indicatorData';

const match = {params: {indicatorId: 'AA', year: 2000}};

test('Calls action creator if year is set', async () => {
	const actionCreator = jest.fn();
	indicator({match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
	expect(actionCreator.mock.calls[0][0]).toBe('AA');
	expect(actionCreator.mock.calls[0][1]).toBe(2000);
});

test('Calls action creator if indicator is changed', async () => {
	const actionCreator = jest.fn();
	indicator({match, indicator: {id: 'BB'}}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
	expect(actionCreator.mock.calls[0][0]).toBe('AA');
	expect(actionCreator.mock.calls[0][1]).toBe(2000);
});

test('Calls action creator if year is changed', async () => {
	const actionCreator = jest.fn();
	indicator({match, currentYear: 1990}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
	expect(actionCreator.mock.calls[0][0]).toBe('AA');
	expect(actionCreator.mock.calls[0][1]).toBe(2000);
});

test('Does not call action creator if year is not set', async () => {
	const actionCreator = jest.fn();
	indicator({match: {params: {indicatorId: 'AA'}}}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(0);
});

test('Does not call action creator if year and indicator did not change', async () => {
	const actionCreator = jest.fn();
	indicator({
		match,
		indicator: {id: 'AA'},
		currentYear: 2000
	}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(0);
});
