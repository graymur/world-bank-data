import queryString from 'query-string';

export default (props, dispatchLoadingAction) => {
	const parsed = queryString.parse(props.location.search);

	if (parsed.search && props.searchString !== parsed.search) {
		return dispatchLoadingAction(parsed.search);
	}
};
