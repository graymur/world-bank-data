import wrapWithErrorHandling from '../util/wrapWithErrorHandling';

export default dataSource => wrapWithErrorHandling(async (req, res) => {
	return res.json(await dataSource.fetchCountries());
});
