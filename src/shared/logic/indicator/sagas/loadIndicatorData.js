import {call, put, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions.js';
import {setError} from 'shared/logic/shared/actions';
import dataSource from 'shared/dataSource';

export function * loadIndicatorData({payload: {indicatorId, year}}) {
	try {
		yield put(actions.setCurrentYear(year));
		yield put(actions.setIndicatorDataLoading());

		const result = yield call(dataSource.fetchIndicatorDataByYear, indicatorId, year);

		if (result && result.error) {
			throw new Error(result.error);
		}

		yield put(actions.setIndicatorData(result));
	} catch (e) {
		yield put(setError(e));
	} finally {
		yield put(actions.setIndicatorDataLoading(false));
	}
}

export default function * loadIndicatorDataSaga() {
	yield takeLatest(actions.loadIndicatorData.toString(), loadIndicatorData);
}
