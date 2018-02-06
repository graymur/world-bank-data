/* eslint-disable */
import * as actions from '../actions';
import reducer, {initialState} from '../reducer';

test('setCurrentYear', () => {
	const state = reducer(initialState, actions.setCurrentYear(1900));
	expect(state.currentYear).toEqual(1900);
});
