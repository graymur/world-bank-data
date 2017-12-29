import {call, put, takeEvery} from 'redux-saga/effects';
import * as actions from '../actions.js';
// import {setError} from 'shared/logic/shared/actions';
import dataSource from 'shared/dataSource';

export function * suggestIndicatorData({payload: {indicatorId, year}}) {
	try {
		const result = yield call(dataSource.fetchIndicatorDataByYear, indicatorId, year);

		if (result && result.error) {
			throw new Error(result.error);
		}

		yield put(actions.setSuggestIndicatorData(year, result));
	} catch (e) {}
}

export default function * suggestIndicatorDataSaga() {
	yield takeEvery(actions.suggestIndicatorData.toString(), suggestIndicatorData);
}
