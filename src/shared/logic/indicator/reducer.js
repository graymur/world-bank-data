import * as actions from './actions';
import {handleActions} from 'redux-actions';
import getMaxIndicatorYear from 'shared/utils/getMaxIndicatorYear';

export const INDICATOR_REDUCER_KEY = 'Indicator';

export const initialState = {
	indicator: undefined,
	loading: false,
	error: undefined,
	currentYear: getMaxIndicatorYear(),
	data: undefined,
	dataLoading: false,
	dataError: undefined,
	suggestData: {}
};

const loadIndicator = state => ({
	...state,
	indicator: undefined,
	data: undefined,
	currentYear: undefined,
	suggestData: {}
});

const setIndicatorLoading = (state, {payload: loading}) => ({
	...state,
	loading
});

const setIndicator = (state, {payload: indicator}) => ({
	...state,
	indicator
});

const loadIndicatorData = (state, {payload: {year: currentYear}}) => ({
	...state,
	data: undefined,
	currentYear
});

const setCurrentYear = (state, {payload: currentYear}) => ({
	...state,
	currentYear
});

const setIndicatorDataLoading = (state, {payload: dataLoading}) => ({
	...state,
	dataLoading
});

const setIndicatorData = (state, {payload: data}) => ({
	...state,
	data
});

const setSuggestIndicatorData = (state, {payload: {year, data}}) => ({
	...state,
	suggestData: Object.assign({}, state.suggestData, data.length && {[year]: data})
});

const locationChange = (state) => ({
	...state,
	suggestData: {}
});

export default handleActions({
	'@@router/LOCATION_CHANGE': locationChange,
	[actions.loadIndicator]: loadIndicator,
	[actions.setIndicatorLoading]: setIndicatorLoading,
	[actions.setIndicator]: setIndicator,
	[actions.loadIndicatorData]: loadIndicatorData,
	[actions.setCurrentYear]: setCurrentYear,
	[actions.setIndicatorDataLoading]: setIndicatorDataLoading,
	[actions.setIndicatorData]: setIndicatorData,
	[actions.setSuggestIndicatorData]: setSuggestIndicatorData
}, initialState);
