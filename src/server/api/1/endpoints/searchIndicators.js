import _ from 'lodash';
import dataSource from 'server/dataSource';
import wrapWithErrorHandling from '../util/wrapWithErrorHandling';

const resultFields = ['id', 'name'];

export default wrapWithErrorHandling(async (req, res) => {
	if (!req.query.pattern || req.query.pattern.length < 3) {
		throw new Error('Search pattern should be at least 3 characters long');
	}

	const indicators = await dataSource.searchIndicators(req.query.pattern);
	return res.json(indicators.map(x => _.pick(x, resultFields)));
});
