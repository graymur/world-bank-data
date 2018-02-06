import * as actions from './actions';
import {handleActions} from 'redux-actions';
import getMaxIndicatorYear from 'shared/utils/getMaxIndicatorYear';

export const INDICATOR_REDUCER_KEY = 'Indicator';

export const initialState = {
	currentYear: getMaxIndicatorYear()
};

export default handleActions({
	[actions.setCurrentYear]: (state, {payload: currentYear}) => ({
		...state,
		currentYear
	})
}, initialState);
