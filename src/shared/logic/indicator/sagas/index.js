import loadIndicatorSaga from './loadIndicator';
import loadIndicatorDataSaga from './loadIndicatorData';
import suggestIndicatorSaga from './suggestIndicatorData';

export default [
	loadIndicatorSaga(),
	loadIndicatorDataSaga(),
	suggestIndicatorSaga()
];
