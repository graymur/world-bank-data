import Indicators from 'shared/logic/indicators/sagas';
// import Indicator from 'shared/logic/indicator/sagas';
// import indicatorByCountryData from 'shared/logic/indicatorByCountryData/sagas';
import {all} from 'redux-saga/effects';

export default function * saga() {
	yield all([
		...Indicators
		// ...Indicator,
		// ...indicatorByCountryData
	]);
}
