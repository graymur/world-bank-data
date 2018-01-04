/* eslint-disable */

const indicatorModelFactory = () => {
	const IndicatorModel = jest.fn();

	IndicatorModel.prototype.save = jest.fn();
	IndicatorModel.prototype.save.mockReturnValue(Promise.resolve(1));
	IndicatorModel.remove = jest.fn();

	return IndicatorModel;
};

export const IndicatorModel = indicatorModelFactory();
