import wrapWithErrorHandling from '../util/wrapWithErrorHandling';

const err404Message = 'Indicator not found';

export default dataSource => wrapWithErrorHandling(async (req, res) => {
	return res.json(await dataSource.fetchIndicator(req.params.indicatorId));
}, {err404Message});
