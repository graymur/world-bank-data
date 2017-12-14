import dataSource from 'server/dataSource';
import _ from 'lodash';

const resultFields = ['id', 'name'];

export default async (req, res) => {
	try {
		const indicators = await dataSource.searchIndicators(req.query.pattern, 20);
		return res.json(indicators.map(x => _.pick(x, resultFields)));
	} catch (e) {
		return res.status(500).send(e.message);
	}
};
