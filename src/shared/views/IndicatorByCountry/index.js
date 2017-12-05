import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import loadIndicatorByCountryDataIfNeeded from 'shared/logic/loadIfNeeded/indicatorByCountryData';
import loadIndicatorIfNeeded from 'shared/logic/loadIfNeeded/indicator';

import {loadIndicatorByCountryData as loadDataSaga} from 'shared/logic/indicatorByCountryData/sagas/loadindicatorByCountryData';
import {selectIndicatorByCountryData as selectData} from 'shared/logic/indicatorByCountryData/selectors';
import {loadIndicatorByCountryData as loadDataAction} from 'shared/logic/indicatorByCountryData/actions';

import {loadIndicator as loadIndicatorSaga} from 'shared/logic/indicator/sagas/loadIndicator';
import {selectIndicator} from 'shared/logic/indicator/selectors';
import {loadIndicator as loadIndicatorAction} from 'shared/logic/indicator/actions';

import {selectCountry} from 'shared/logic/country/selectors';

import {LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer} from 'recharts';
import Country from 'shared/views/Country';
import Loader from 'shared/components/Loader';

import './indicatorByCountry.scss';

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

	renderIndicatorInfo() {
		const {indicator} = this.props;

		if (!indicator) {
			return null;
		}

		return (
			<div className='indicator-chart__info'>
				<h2>{indicator.name}</h2>
				<p>{indicator.sourceNote}</p>
				<p>Source: {indicator.sourceOrganization}</p>
			</div>
		);
	}

	renderChart(data) {
		return (
			<div className='indicator-chart__wr'>
				<ResponsiveContainer>
					<LineChart height={300} data={data.reverse()}>
						<Line type='monotone' dataKey='value' stroke='#8884d8'/>
						<CartesianGrid stroke='#ccc'/>
						<XAxis dataKey='date'/>
						<YAxis />
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	}

	renderData() {
		const {data, country} = this.props;

		if (typeof data === 'undefined') {
			return <div className='indicator-chart _loading'><Loader/></div>;
		}

		const nonEmptyValues = (data || []).filter(x => x.value);

		return (
			<Modal isOpen={Boolean(true)} ariaHideApp={false}>
				<div className='indicator-chart'>
					{country && <Link className='indicator-chart__back' to={`/countries/${country.iso2Code}`}>Close</Link>}
					{this.renderIndicatorInfo()}
					{nonEmptyValues.length ? this.renderChart(nonEmptyValues) : <h3 className='no-data'>No data for this country</h3> }
				</div>
			</Modal>
		);
	}

	render() {
		return (
			<div className='indicator-by-country'>
				<Country match={this.props.match}/>
				{this.renderData()}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	country: selectCountry(),
	indicator: selectIndicator(),
	data: selectData()
});

export default connect(mapStateToProps, {
	loadDataAction,
	loadIndicatorAction
})(IndicatorByCountry);
