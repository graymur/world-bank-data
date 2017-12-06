import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import loadIndicatorIfNeeded from 'shared/logic/loadIfNeeded/indicator';
import {loadIndicator} from 'shared/logic/indicator/sagas/loadIndicator';
import * as actions from 'shared/logic/indicator/actions';
import * as selectors from 'shared/logic/indicator/selectors';
import IndicatorMain from './components/IndicatorMain';

export class Indicator extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		indicator: PropTypes.object,
		currentYear: PropTypes.number,
		data: PropTypes.array,
		loadIndicator: PropTypes.func,
		loadIndicatorData: PropTypes.func
	};

	static preload = match => [[loadIndicator, actions.loadIndicator(match)]];

	componentDidMount() {
		loadIndicatorIfNeeded(this.props, this.props.loadIndicator);
	}

	render() {
		// const {loading, indicator, loadIndicatorData, currentYear, data} = this.props;
		const years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010];
		return <IndicatorMain {...this.props} years={years}/>;
	}
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.selectLoading,
	indicator: selectors.selectIndicator,
	currentYear: selectors.selectCurrentYear,
	data: selectors.selectIndicatorData,
	dataLoading: selectors.selectIndicatorDataLoading
});

export default connect(mapStateToProps, actions)(Indicator);
