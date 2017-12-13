import dataSource from 'server/dataSource';

export default async (req, res) => {
	return res.json(await dataSource.fetchIndicatorByCountryData(req.params.iso2Code, req.params.indicatorId));
};
