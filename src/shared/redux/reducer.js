import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import shared, {SHARED_REDUCER_KEY} from 'shared/logic/shared/reducer';
import indicators, {INDICATORS_REDUCER_KEY} from 'shared/logic/indicators/reducer';
import indicator, {INDICATOR_REDUCER_KEY} from 'shared/logic/indicator/reducer';
// import indicatorByCountryData, {INDICATOR_BY_COUNTRY_DATA_REDUCER_KEY} from 'shared/logic/indicatorByCountryData/reducer';

export default combineReducers({
	[SHARED_REDUCER_KEY]: shared,
	[INDICATORS_REDUCER_KEY]: indicators,
	[INDICATOR_REDUCER_KEY]: indicator,
	// [INDICATOR_BY_COUNTRY_DATA_REDUCER_KEY]: indicatorByCountryData,
	routing: routerReducer
});
