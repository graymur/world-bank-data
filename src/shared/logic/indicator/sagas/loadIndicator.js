import {call, put, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions.js';
import dataSource from 'shared/dataSource';

export function * loadIndicator(action) {
	try {
		yield put(actions.setIndicatorLoading());

		const result = yield call(dataSource.fetchIndicator, action.payload);

		if (result && result.error) {
			throw new Error(result.error);
		}

		yield put(actions.setIndicatorLoadingError(false));
		yield put(actions.setIndicator(result));
	} catch (e) {
		yield put(actions.setIndicatorLoadingError(e));
	} finally {
		yield put(actions.setIndicatorLoading(false));
	}
}

export default function * loadIndicatorSaga() {
	yield takeLatest(actions.loadIndicator.toString(), loadIndicator);
}
