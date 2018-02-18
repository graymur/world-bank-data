import {createAction} from 'redux-actions';

export const setSearchString = createAction('Indicators.setSearchString', searchString => searchString);
