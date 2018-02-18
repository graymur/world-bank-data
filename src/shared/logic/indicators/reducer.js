import * as actions from './actions';
import {handleActions} from 'redux-actions';

export const INDICATORS_REDUCER_KEY = 'Indicators';

export const initialState = {
	searchString: ''
};

export default handleActions({
	[actions.setSearchString]: (state, {payload: searchString}) => ({
		...state,
		searchString
	})
}, initialState);
