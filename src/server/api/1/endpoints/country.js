import dataSource from 'server/dataSource';
import wrapWithErrorHandling from '../util/wrapWithErrorHandling';

const err404Message = 'Country not found';

export default wrapWithErrorHandling(async (req, res) => {
	return res.json(await dataSource.fetchCountry(req.params.iso2Code));
}, {err404Message});
