import {createSelector} from 'reselect';
import {INDICATORS_REDUCER_KEY} from './reducer';

export const selectState = state => state[INDICATORS_REDUCER_KEY];

export const selectLoading = createSelector(
	selectState,
	main => main.loading
);

export const selectIndicators = createSelector(
	selectState,
	main => main.indicators
);

export const selectUserIndicators = createSelector(
	selectState,
	main => main.userIndicators
);

export const selectFoundIndicators = createSelector(
	selectState,
	main => main.foundIndicators
);

export const selectSearching = createSelector(
	selectState,
	main => main.searching
);
