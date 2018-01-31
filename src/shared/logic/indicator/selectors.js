import {createSelector} from 'reselect';
import {INDICATOR_REDUCER_KEY} from './reducer';

export const selectState = state => state[INDICATOR_REDUCER_KEY];

export const loading = createSelector(
	selectState,
	main => main.loading
);

export const indicator = createSelector(
	selectState,
	main => main.indicator
);

export const currentYear = createSelector(
	selectState,
	main => main.currentYear
);

export const dataLoading = createSelector(
	selectState,
	main => main.dataLoading
);

export const indicatorData = createSelector(
	selectState,
	main => main.data
);

export const suggestData = createSelector(
	selectState,
	main => main.suggestData
);
