import {createAction} from 'redux-actions';

export const loadIndicators = createAction('Indicators.loadIndicators', () => {});
export const setIndicatorsLoading = createAction('Indicators.setIndicatorsLoading', (value = true) => value);
export const setIndicators = createAction('Indicators.setIndicators', indicators => indicators);

export const searchIndicators = createAction('Indicators.searchIndicators', pattern => pattern);
export const setSearching = createAction('Indicators.setSearching', (value = true) => value);
export const setFoundIndicators = createAction('Indicators.setFoundIndicators', indicators => indicators);

export const setSearchString = createAction('Indicators.setSearchString', searchString => searchString);
