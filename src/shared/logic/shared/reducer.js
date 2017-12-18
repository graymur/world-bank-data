import * as actions from './actions';
import {handleActions} from 'redux-actions';

export const SHARED_REDUCER_KEY = 'Shared';

export const initialState = {
	error: undefined,
	loading: false
};

export default handleActions({
	[actions.setLoading]: (state, {payload: loading}) => ({
		...state,
		loading
	}),
	[actions.setError]: (state, {payload: error}) => ({
		...state,
		error
	}),
	[actions.clearError]: (state) => ({
		...state,
		error: undefined
	}),
	'@@router/LOCATION_CHANGE': (state) => ({
		...state,
		error: undefined
	})
}, initialState);
