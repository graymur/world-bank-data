import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import getPageTitle from 'shared/utils/getPageTitle';
import Modal from 'shared/components/Modal';
import classnames from 'classnames';
import Country from 'shared/views/Country';
import Loader from 'shared/components/Loader';
import Chart from '../Chart';
import './indicatorByCountry.scss';

export default class IndicatorByCountryMain extends React.Component {
	static propTypes = {
		match: PropTypes.object,
		country: PropTypes.object,
		indicator: PropTypes.object,
		data: PropTypes.any
	};

	renderIndicatorInfo() {
		const {indicator} = this.props;

		if (!indicator) {
			return null;
		}

		return (
			<div className='indicator-chart__info'>
				<h2>{indicator.name}</h2>
				<p>{indicator.sourceNote}</p>
				{indicator.sourceOrganization && <p>Source: {indicator.sourceOrganization}</p>}
			</div>
		);
	}

	renderData() {
		const {data, country} = this.props;
		let content = '';
		const loading = typeof data === 'undefined';

		if (loading) {
			content = <Loader/>;
		} else {
			const nonEmptyValues = (data || []).filter(x => x.value);

			content = nonEmptyValues.length
				? <Chart data={nonEmptyValues}/>
				: <h3 className='no-data'>No data for this country</h3>;
		}

		const className = classnames('indicator-chart__wr', {'loading': loading});

		return (
			<Modal isOpen={Boolean(true)} ariaHideApp={false}>
				<div className='indicator-chart'>
					{country && <Link className='indicator-chart__back' to={`/countries/${country.iso2Code}`}>Close</Link>}
					{this.renderIndicatorInfo()}
					<div className={className}>
						{content}
					</div>
				</div>
			</Modal>
		);
	}

	render() {
		const {country, indicator} = this.props;
		return (
			<div className='indicator-by-country'>
				<Helmet>
					<title>{getPageTitle(`${country && country.name} - ${indicator && indicator.name}`)}</title>
				</Helmet>
				<Country match={this.props.match} setTitle={Boolean(false)}/>
				{this.renderData()}
			</div>
		);
	}
}
