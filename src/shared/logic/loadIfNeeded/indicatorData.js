export default (props, dispatchLoadingAction) => {
	const {match, currentYear} = props;

	if (match.params.year !== currentYear) {
		console.log('CURRENT YEAR', currentYear);
		return dispatchLoadingAction(match.params.indicatorId, match.params.year);
	}
};
