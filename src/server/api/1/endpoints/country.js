import wrapWithErrorHandling from '../util/wrapWithErrorHandling';

const err404Message = 'Country not found';

export default dataSource => wrapWithErrorHandling(async (req, res) => {
	return res.json(await dataSource.fetchCountry(req.params.iso2Code));
}, {err404Message});
