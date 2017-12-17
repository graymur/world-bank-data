import {createSelector} from 'reselect';
import {SHARED_REDUCER_KEY} from './reducer';

export const selectState = state => state[SHARED_REDUCER_KEY];

export const selectError = createSelector(
	selectState,
	main => main.error
);

export const selectLocation = state => state.location;
