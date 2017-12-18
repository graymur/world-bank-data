import {call, put, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions.js';
import {setError} from 'shared/logic/shared/actions';
import dataSource from 'shared/dataSource';

export function * loadCountry(action) {
	try {
		yield put(actions.setCountryLoading());

		const result = yield call(dataSource.fetchCountry, action.payload);

		if (result.error) {
			throw new Error(result.error);
		}

		yield put(actions.setCountry(result));
	} catch (e) {
		yield put(setError(e));
	} finally {
		yield put(actions.setCountryLoading(false));
	}
}

export default function * loadCountrySaga() {
	yield takeLatest(actions.loadCountry.toString(), loadCountry);
}
