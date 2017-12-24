import dataSource from 'server/dataSource';
import wrapWithErrorHandling from '../util/wrapWithErrorHandling';

export default wrapWithErrorHandling(async (req, res) => {
	return res.json(await dataSource.fetchIndicatorByCountryData(req.params.iso2Code, req.params.indicatorId));
});
