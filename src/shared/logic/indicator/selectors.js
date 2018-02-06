import {createSelector} from 'reselect';
import {INDICATOR_REDUCER_KEY} from './reducer';

export const selectState = state => state[INDICATOR_REDUCER_KEY];

export const currentYear = createSelector(
	selectState,
	main => main.currentYear
);
