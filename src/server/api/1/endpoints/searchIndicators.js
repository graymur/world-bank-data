import _ from 'lodash';
import wrapWithErrorHandling from '../util/wrapWithErrorHandling';

const resultFields = ['id', 'name'];

export default dataSource => wrapWithErrorHandling(async (req, res) => {
	const indicators = await dataSource.searchIndicators(req.query.pattern, 20);
	return res.json(indicators.map(x => _.pick(x, resultFields)));
});
