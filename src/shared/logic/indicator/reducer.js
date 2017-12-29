import * as actions from './actions';
import {handleActions} from 'redux-actions';

export const INDICATOR_REDUCER_KEY = 'Indicator';

export const initialState = {
	indicator: undefined,
	loading: false,
	error: undefined,
	currentYear: undefined,
	data: undefined,
	dataLoading: false,
	dataError: undefined,
	suggestData: {}
};

export default handleActions({
	'@@router/LOCATION_CHANGE': (state) => ({
		...state,
		suggestData: {}
	}),
	[actions.loadIndicator]: state => ({
		...state,
		indicator: undefined,
		data: undefined,
		currentYear: undefined,
		suggestData: {}
	}),
	[actions.setIndicatorLoading]: (state, {payload: loading}) => ({
		...state,
		loading
	}),
	[actions.setIndicator]: (state, {payload: indicator}) => ({
		...state,
		indicator
	}),
	[actions.loadIndicatorData]: (state, {payload: {year: currentYear}}) => ({
		...state,
		data: undefined,
		currentYear
	}),
	[actions.setCurrentYear]: (state, {payload: currentYear}) => ({
		...state,
		currentYear
	}),
	[actions.setIndicatorDataLoading]: (state, {payload: dataLoading}) => ({
		...state,
		dataLoading
	}),
	[actions.setIndicatorData]: (state, {payload: data}) => ({
		...state,
		data
	}),
	[actions.setSuggestIndicatorData]: (state, {payload: {year, data}}) => ({
		...state,
		suggestData: Object.assign({}, state.suggestData, data.length && {[year]: data})
	})
}, initialState);
