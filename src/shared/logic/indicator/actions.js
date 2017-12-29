import {createAction} from 'redux-actions';

export const loadIndicator = createAction('Indicator.loadIndicator', match => match.params ? match.params.indicatorId : match);
export const setIndicatorLoading = createAction('Indicator.setIndicatorLoading', (value = true) => value);
export const setIndicator = createAction('Indicator.setIndicator', indicator => indicator);

export const setCurrentYear = createAction('Indicator.setCurrentYear', currentYear => currentYear);
export const loadIndicatorData = createAction('Indicator.loadIndicatorData', (indicatorId, year) => indicatorId.params ? indicatorId.params : {indicatorId, year});
export const setIndicatorDataLoading = createAction('Indicator.setIndicatorDataLoading', (value = true) => value);
export const setIndicatorData = createAction('Indicator.setIndicatorData', data => data);

export const suggestIndicatorData = createAction('Indicator.suggestIndicatorData', (indicatorId, year) => ({indicatorId, year}));
export const setSuggestIndicatorData = createAction('Indicator.setSuggestIndicatorData', (year, data) => ({year, data}));
