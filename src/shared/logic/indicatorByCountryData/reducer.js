import * as actions from './actions';
import {handleActions} from 'redux-actions';

export const INDICATOR_BY_COUNTRY_DATA_REDUCER_KEY = 'IndicatorByCountryData';

export const initialState = {
	data: undefined,
	loading: false,
	error: undefined
};

export default handleActions({
	[actions.loadIndicatorByCountryData]: (state, {payload: loading}) => ({
		...state,
		data: undefined
	}),
	[actions.setIndicatorByCountryDataLoading]: (state, {payload: loading}) => ({
		...state,
		loading
	}),
	[actions.setIndicatorByCountryData]: (state, {payload: data}) => ({
		...state,
		data
	})
}, initialState);
