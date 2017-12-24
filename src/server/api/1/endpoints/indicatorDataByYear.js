import dataSource from 'server/dataSource';
import wrapWithErrorHandling from '../util/wrapWithErrorHandling';

export default wrapWithErrorHandling(async (req, res) => {
	return res.json(await dataSource.fetchIndicatorDataByYear(req.params.indicatorId, req.params.year));
});
