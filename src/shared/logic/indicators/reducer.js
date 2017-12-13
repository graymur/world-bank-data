import * as actions from './actions';
import {handleActions} from 'redux-actions';

export const INDICATORS_REDUCER_KEY = 'Indicators';

export const initialState = {
	indicators: [],
	loading: false,
	error: undefined,
	foundIndicators: undefined,
	searching: false,
	searchError: undefined,
	searchString: ''
};

export default handleActions({
	[actions.setIndicatorsLoading]: (state, {payload: loading}) => ({
		...state,
		loading
	}),
	[actions.setIndicatorsLoadingError]: (state, {payload: error}) => ({
		...state,
		error
	}),
	[actions.setIndicators]: (state, {payload: indicators}) => ({
		...state,
		indicators
	}),
	[actions.setSearching]: (state, {payload: searching}) => ({
		...state,
		searching
	}),
	[actions.setSearchError]: (state, {payload: searchError}) => ({
		...state,
		searchError
	}),
	[actions.setFoundIndicators]: (state, {payload: foundIndicators}) => ({
		...state,
		foundIndicators
	}),
	[actions.setSearchString]: (state, {payload: searchString}) => ({
		...state,
		searchString
	})
}, initialState);
