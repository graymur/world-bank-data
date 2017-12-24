import _ from 'lodash';
import dataSource from 'server/dataSource';
import wrapWithErrorHandling from '../util/wrapWithErrorHandling';

const resultFields = ['id', 'name'];

export default wrapWithErrorHandling(async (req, res) => {
	const indicators = await dataSource.searchIndicators(req.query.pattern, 20);
	return res.json(indicators.map(x => _.pick(x, resultFields)));
});
