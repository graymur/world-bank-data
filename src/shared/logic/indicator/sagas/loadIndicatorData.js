import {call, put, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions.js';
import {setError} from 'shared/logic/shared/actions';
import dataSource from 'shared/dataSource';
// import getYearForSuggestions from 'shared/utils/getYearForSuggestions';

export function * loadIndicatorData({payload: {indicatorId, year}}) {
	try {
		year = Number(year);
		yield put(actions.setCurrentYear(year));
		yield put(actions.setIndicatorDataLoading());

		const result = yield call(dataSource.fetchIndicatorDataByYear, indicatorId, year);

		if (result && result.error) {
			throw new Error(result.error);
		}

		yield put(actions.setIndicatorData(result));

		if (!result.length) {
			// const years = getYearForSuggestions(year);
			//
			// for (const year of years) {
			// 	yield put(actions.suggestIndicatorData(indicatorId, year));
			// }
		}
	} catch (e) {
		yield put(setError(e));
	} finally {
		yield put(actions.setIndicatorDataLoading(false));
	}
}

export default function * loadIndicatorDataSaga() {
	yield takeLatest(actions.loadIndicatorData.toString(), loadIndicatorData);
}
