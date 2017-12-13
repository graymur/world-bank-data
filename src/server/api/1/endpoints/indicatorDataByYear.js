import dataSource from 'server/dataSource';

export default async (req, res) => {
	return res.json(await dataSource.fetchIndicatorDataByYear(req.params.indicatorId, req.params.year));
};
