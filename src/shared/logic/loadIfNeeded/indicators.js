export default (props, dispatchLoadingAction) => {
	if (!props.indicators || !props.indicators.length) {
		return dispatchLoadingAction();
	}
};
