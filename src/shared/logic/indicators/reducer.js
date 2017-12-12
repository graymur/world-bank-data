import * as actions from './actions';
import {handleActions} from 'redux-actions';
import uniqBy from 'lodash/uniqBy';

export const INDICATORS_REDUCER_KEY = 'Indicators';

export const initialState = {
	indicators: [],
	loading: false,
	error: undefined,
	userIndicators: [],
	foundIndicators: undefined,
	searching: false,
	searchError: undefined
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
	[actions.addUserIndicator]: (state, {payload: id}) => ({
		...state,
		userIndicators: uniqBy([...state.userIndicators, state.foundIndicators.find(x => x.id === id)], x => x.id)
	})
}, initialState);
