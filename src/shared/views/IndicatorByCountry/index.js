import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import loadIndicatorByCountryDataIfNeeded from 'shared/logic/loadIfNeeded/indicatorByCountryData';
import loadIndicatorIfNeeded from 'shared/logic/loadIfNeeded/indicator';

import {loadIndicatorByCountryData as loadDataSaga} from 'shared/logic/indicatorByCountryData/sagas/loadIndicatorByCountryData';
import {selectIndicatorByCountryData as selectData} from 'shared/logic/indicatorByCountryData/selectors';
import {loadIndicatorByCountryData as loadDataAction} from 'shared/logic/indicatorByCountryData/actions';

import {loadIndicator as loadIndicatorSaga} from 'shared/logic/indicator/sagas/loadIndicator';
import {selectIndicator} from 'shared/logic/indicator/selectors';
import {loadIndicator as loadIndicatorAction} from 'shared/logic/indicator/actions';

import {selectCountry} from 'shared/logic/country/selectors';

import Country from 'shared/views/Country';

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

	static preload = match => [
		[loadDataSaga, loadDataAction(match)],
		[loadIndicatorSaga, loadIndicatorAction(match)],
		...Country.preload(match)
	];

	componentDidMount() {
		loadIndicatorByCountryDataIfNeeded(this.props, this.props.loadDataAction);
		loadIndicatorIfNeeded(this.props, this.props.loadIndicatorAction);
	}

	render() {
		return <IndicatorByCountryMain {...this.props}/>;
	}
}

const mapStateToProps = createStructuredSelector({
	country: selectCountry,
	indicator: selectIndicator,
	data: selectData
});

export default connect(mapStateToProps, {
	loadDataAction,
	loadIndicatorAction
})(IndicatorByCountry);
