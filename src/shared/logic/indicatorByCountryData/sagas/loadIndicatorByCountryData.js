import {call, put, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions.js';
import dataSource from 'shared/dataSource';

export function * loadIndicatorByCountryData({payload: {iso2Code, indicatorId}}) {
	try {
		yield put(actions.setIndicatorByCountryDataLoading());

		const result = yield call(dataSource.fetchIndicatorByCountryData, iso2Code, indicatorId);

		if (result && result.error) {
			throw new Error(result.error);
		}

		yield put(actions.setIndicatorByCountryDataLoadingError(false));
		yield put(actions.setIndicatorByCountryData(result));
	} catch (e) {
		yield put(actions.setIndicatorByCountryDataLoadingError(e));
	} finally {
		yield put(actions.setIndicatorByCountryDataLoading(false));
	}
}

export default function * loadIndicatorByCountryDataSaga() {
	yield takeLatest(actions.loadIndicatorByCountryData.toString(), loadIndicatorByCountryData);
}
