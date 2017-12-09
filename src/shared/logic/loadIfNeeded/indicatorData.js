export default (props, dispatchLoadingAction) => {
	const {match, currentYear} = props;

	if (match.params.year && match.params.year !== currentYear) {
		return dispatchLoadingAction(match.params.indicatorId, match.params.year);
	}
};
