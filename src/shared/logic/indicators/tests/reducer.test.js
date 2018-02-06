/* eslint-disable */
import * as actions from '../actions';
import reducer, {initialState} from '../reducer';

test('setSearchString', () => {
	const state = reducer(initialState, actions.setSearchString('string'));
	expect(state.searchString).toBe('string');
});
