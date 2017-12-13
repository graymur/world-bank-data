import dataSource from 'server/dataSource';
import _ from 'lodash';

const resultFields = ['id', 'name'];

export default async (req, res) => {
	const countries = await dataSource.searchIndicators(req.query.pattern, 20);
	return res.json(countries.map(x => _.pick(x, resultFields)));
};
