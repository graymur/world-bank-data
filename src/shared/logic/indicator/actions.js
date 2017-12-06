import {createAction} from 'redux-actions';

export const loadIndicator = createAction('Indicator.loadIndicator', match => match.params ? match.params.indicatorId : match);
export const setIndicatorLoading = createAction('Indicator.setIndicatorLoading', (value = true) => value);
export const setIndicatorLoadingError = createAction('Indicator.setIndicatorLoadingError', error => error);
export const setIndicator = createAction('Indicator.setIndicator', indicator => indicator);

export const loadIndicatorData = createAction('Indicator.loadIndicatorData', (indicatorId, year) => indicatorId.params ? indicatorId.params : {indicatorId, year});
export const setIndicatorDataLoading = createAction('Indicator.setIndicatorDataLoading', (value = true) => value);
export const setIndicatorDataLoadingError = createAction('Indicator.setIndicatorDataLoadingError', error => error);
export const setIndicatorData = createAction('Indicator.setIndicatorData', data => data);
