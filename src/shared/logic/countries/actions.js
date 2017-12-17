import {createAction} from 'redux-actions';

export const loadCountries = createAction('Countries.loadCountries');
export const setCountriesLoading = createAction('Countries.setCountriesLoading', (value = true) => value);
export const setCountries = createAction('Countries.setCountries', products => products);
