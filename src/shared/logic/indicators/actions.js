import {createAction} from 'redux-actions';

export const loadIndicators = createAction('Indicators.loadIndicators', () => {});
export const setIndicatorsLoading = createAction('Indicators.setIndicatorsLoading', (value = true) => value);
export const setIndicatorsLoadingError = createAction('Indicators.setIndicatorsLoadingError', error => error);
export const setIndicators = createAction('Indicators.setIndicators', indicators => indicators);

export const searchIndicators = createAction('Indicators.searchIndicators', pattern => pattern);
export const setSearching = createAction('Indicators.setSearching', (value = true) => value);
export const setSearchError = createAction('Indicators.setSearchError', error => error);
export const setFoundIndicators = createAction('Indicators.setFoundIndicators', indicators => indicators);

export const setSearchString = createAction('Indicators.setSearchString', searchString => searchString);
