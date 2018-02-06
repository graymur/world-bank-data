/* eslint-disable */
import * as actions from '../actions';

test('setSearchString', () => {
	expect(actions.setSearchString('string'))
		.toEqual({type: 'Indicators.setSearchString', payload: 'string'});
});
