export default (props, dispatchLoadingAction) => {
	const {match, currentYear, indicator} = props;

	if (match.params.year && (match.params.year !== currentYear || match.params.indicatorId !== indicator.id)) {
		return dispatchLoadingAction(match.params.indicatorId, match.params.year);
	}
};
