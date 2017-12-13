import dataSource from 'server/dataSource';

export default async (req, res) => {
	const indicators = await dataSource.fetchIndicators();
	return res.json(indicators);
};
