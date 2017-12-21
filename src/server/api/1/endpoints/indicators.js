import dataSource from 'server/dataSource';
import wrapWithErrorHandling from '../util/wrapWithErrorHandling';

export default wrapWithErrorHandling(async (req, res) => {
	const indicators = await dataSource.fetchIndicators();
	return res.json(indicators);
});
