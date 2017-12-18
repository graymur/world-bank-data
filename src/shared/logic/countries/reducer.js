import * as actions from './actions';
import {handleActions} from 'redux-actions';

export const COUNTRIES_REDUCER_KEY = 'Countries';

export const initialState = {
	countries: [],
	loading: false
};

export default handleActions({
	[actions.setCountriesLoading]: (state, {payload: loading}) => ({
		...state,
		loading
	}),
	[actions.setCountries]: (state, {payload: countries}) => ({
		...state,
		countries
	})
}, initialState);
