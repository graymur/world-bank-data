import {call, put, takeLatest} from 'redux-saga/effects';
import * as actions from 'shared/logic/indicators/actions';
import dataSource from 'shared/dataSource';

export function * searchIndicators({payload: pattern}) {
	try {
		yield put(actions.setSearching());
		yield put(actions.setFoundIndicators(undefined));
		yield put(actions.setSearchString(pattern));

		if (pattern.length >= 3) {
			const result = yield call(dataSource.searchIndicators, pattern);

			if (result && result.error) {
				throw new Error(result.error);
			}

			yield put(actions.setSearchError(false));
			yield put(actions.setFoundIndicators(result));
		}
	} catch (e) {
		yield put(actions.setSearchError(e));
	} finally {
		yield put(actions.setSearching(false));
	}
}

export default function * searchIndicatorsSaga() {
	yield takeLatest(actions.searchIndicators.toString(), searchIndicators);
}
