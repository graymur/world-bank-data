export default (props, dispatchLoadingAction) => {
	if (!props.countries || !props.countries.length) {
		return dispatchLoadingAction();
	}
};
