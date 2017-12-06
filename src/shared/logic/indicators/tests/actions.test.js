/* eslint-disable */
import * as actions from '../actions';

test('loadIndicators', () => {
	expect(actions.loadIndicators()).toEqual({type: 'Indicators.loadIndicators'});
});

test('setIndicatorsLoading', () => {
	expect(actions.setIndicatorsLoading(true)).toEqual({type: 'Indicators.setIndicatorsLoading', payload: true});
});

test('setIndicatorsLoadingError', () => {
	expect(actions.setIndicatorsLoadingError('Error')).toEqual({type: 'Indicators.setIndicatorsLoadingError', payload: 'Error'});
});

test('setIndicators', () => {
	expect(actions.setIndicators([1,2])).toEqual({type: 'Indicators.setIndicators', payload: [1,2]});
});
