/* eslint-disable */
import indicatorByCountryData from '../indicatorByCountryData';

const country = {iso2Code: 'AA'};
const indicator = {id: 'II'};
const match = {params: {
	iso2Code: 'AA',
	indicatorId: 'II'
}};

test('Calls action creator if country and indicator are undefined', async () => {
	const actionCreator = jest.fn();
	indicatorByCountryData({match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
	expect(actionCreator.mock.calls[0][0]).toBe('AA');
	expect(actionCreator.mock.calls[0][1]).toBe('II');
});

test('Calls action creator if country is undefined', async () => {
	const actionCreator = jest.fn();
	indicatorByCountryData({indicator, match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
	expect(actionCreator.mock.calls[0][0]).toBe('AA');
	expect(actionCreator.mock.calls[0][1]).toBe('II');
});

test('Calls action creator if indicator is undefined', async () => {
	const actionCreator = jest.fn();
	indicatorByCountryData({country, match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
	expect(actionCreator.mock.calls[0][0]).toBe('AA');
	expect(actionCreator.mock.calls[0][1]).toBe('II');
});

test('Calls action creator if country changed', async () => {
	const actionCreator = jest.fn();
	indicatorByCountryData({country: {iso2Code: 'BB'}, indicator, match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
	expect(actionCreator.mock.calls[0][0]).toBe('AA');
	expect(actionCreator.mock.calls[0][1]).toBe('II');
});

test('Calls action creator if indicator changed', async () => {
	const actionCreator = jest.fn();
	indicatorByCountryData({country, indicator: {indicatorId: 'ZZ'}, match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(1);
	expect(actionCreator.mock.calls[0][0]).toBe('AA');
	expect(actionCreator.mock.calls[0][1]).toBe('II');
});

test('Does not call action creator if country and indicator did not change', async () => {
	const actionCreator = jest.fn();
	indicatorByCountryData({country, indicator, match}, actionCreator);
	expect(actionCreator.mock.calls.length).toBe(0);
});
