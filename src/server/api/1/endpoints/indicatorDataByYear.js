import dataSource from 'server/dataSource';

export default async (req, res) => {
	try {
		return res.json(await dataSource.fetchIndicatorDataByYear(req.params.indicatorId, req.params.year));
	} catch (e) {
		return res.status(500).send({error: e.message});
	}
};
