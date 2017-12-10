import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import loadIndicatorIfNeeded from 'shared/logic/loadIfNeeded/indicator';
import loadIndicatorDataIfNeeded from 'shared/logic/loadIfNeeded/indicatorData';
import {loadIndicator} from 'shared/logic/indicator/sagas/loadIndicator';
import {loadIndicatorData} from 'shared/logic/indicator/sagas/loadIndicatorData';
import * as actions from 'shared/logic/indicator/actions';
import * as selectors from 'shared/logic/indicator/selectors';
import IndicatorMain from './components/IndicatorMain';
import {withRouter} from 'react-router-dom';
import range from 'lodash/range';

const years = range(1990, (new Date()).getFullYear());

export class Indicator extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		indicator: PropTypes.object,
		currentYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		data: PropTypes.array,
		loadIndicator: PropTypes.func,
		loadIndicatorData: PropTypes.func,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
			location: PropTypes.object
		})
	};

	static preload = match => [
		[loadIndicator, actions.loadIndicator(match)],
		match.params.year ? [loadIndicatorData, actions.loadIndicatorData(match)] : undefined
	];

	constructor(props) {
		super(props);
		this.loadData = this.loadData.bind(this);
	}

	componentDidMount() {
		loadIndicatorIfNeeded(this.props, this.props.loadIndicator);
		loadIndicatorDataIfNeeded(this.props, this.props.loadIndicatorData);
	}

	loadData(indicatorId, year) {
		const {history, indicator, loadIndicatorData} = this.props;
		history.push(`/indicators/${indicator.id}/${year}#chart`);
		loadIndicatorData(indicatorId, year);
	}

	render() {
		return <IndicatorMain {...this.props} loadIndicatorData={this.loadData} years={years}/>;
	}
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.selectLoading,
	indicator: selectors.selectIndicator,
	currentYear: selectors.selectCurrentYear,
	data: selectors.selectIndicatorData,
	dataLoading: selectors.selectIndicatorDataLoading
});

export default connect(mapStateToProps, actions)(withRouter(Indicator));
