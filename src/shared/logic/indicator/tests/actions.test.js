/* eslint-disable */
import * as actions from '../actions';

test('setCurrentYear', () => {
	expect(actions.setCurrentYear(1900)).toEqual({type: 'Indicator.setCurrentYear', payload: 1900});
});
