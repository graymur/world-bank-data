import getMaxIndicatorYear from './getMaxIndicatorYear';

export default year => {
	const maxYear = getMaxIndicatorYear();
	// year = 2050;
	// const maxYear = 2055;
	return [year - 3, year - 2, year - 1, year + 1, year + 2, year + 3]
		.filter(x => x <= maxYear);
};
