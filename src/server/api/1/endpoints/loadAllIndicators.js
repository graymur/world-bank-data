import config from 'config';
import {IndicatorModel} from 'server/api/1/models/Indicator';
import Promise from 'bluebird';

export default dataSource => async (req, res) => {
	if (req.query.token !== config.securityToken) {
		return res.status(401).send('Wrong Token');
	}

	const indicators = await dataSource.fetchIndicatorsFromWB(200000);

	await IndicatorModel.remove({});

	const result = await Promise.map(indicators, item => {
		const model = new IndicatorModel({
			id: item.id,
			name: item.name,
			data: item,
			createdAt: new Date()
		});

		return model.save().catch(err => console.log(err.message));
	}, {concurrency: 5});

	return res.json({inserted: result.length});
};
