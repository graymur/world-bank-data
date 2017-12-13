import dataSource from 'server/dataSource';

export default async (req, res) => {
	return res.json(await dataSource.fetchIndicator(req.params.indicatorId));
};
