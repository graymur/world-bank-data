import {createSelector} from 'reselect';
import {INDICATORS_REDUCER_KEY} from './reducer';

export const selectState = state => state[INDICATORS_REDUCER_KEY];

export const searchString = createSelector(
	selectState,
	main => main.searchString
);
