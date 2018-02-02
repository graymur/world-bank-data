import React from 'react';
import PropTypes from 'prop-types';
import IndicatorProvider from 'shared/providers/Indicator';
import IndicatorByCountryMain from './components/IndicatorByCountryMain';

export class IndicatorByCountry extends React.Component {
	static propTypes = {
		match: PropTypes.object,
		country: PropTypes.object,
		indicator: PropTypes.object,
		data: PropTypes.any,
		loadDataAction: PropTypes.func,
		loadIndicatorAction: PropTypes.func
	};

	// static preload = match => [
	// 	[loadDataSaga, loadDataAction(match)],
	// 	[loadIndicatorSaga, loadIndicatorAction(match)]
	// ];

	// componentDidMount() {
	// 	loadIndicatorByCountryDataIfNeeded(this.props, this.props.loadDataAction);
	// 	loadIndicatorIfNeeded(this.props, this.props.loadIndicatorAction);
	// }

	render() {
		return <IndicatorProvider indicatorId={this.props.match.params.indicatorId} render={data =>
			<IndicatorByCountryMain {...this.props} {...data}/>
		}/>;
	}
}

export default IndicatorByCountry;
