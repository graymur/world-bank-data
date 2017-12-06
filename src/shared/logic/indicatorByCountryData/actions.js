import {createAction} from 'redux-actions';

export const loadIndicatorByCountryData = createAction(
	'IBCD.loadIBCD',
	(iso2Code, indicatorId) => iso2Code.params ? iso2Code.params : {iso2Code, indicatorId}
);
export const setIndicatorByCountryDataLoading = createAction('IBCD.setIBCDLoading', (value = true) => value);
export const setIndicatorByCountryDataLoadingError = createAction('IBCD.setIBCDLoadingError', error => error);
export const setIndicatorByCountryData = createAction('IBCD.setIBCD', data => data);
