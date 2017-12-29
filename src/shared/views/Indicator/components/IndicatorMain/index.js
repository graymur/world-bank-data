import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import getPageTitle from 'shared/utils/getPageTitle';
import Loader from 'shared/components/Loader';
import IndicatorData from '../IndicatorData';
import classnames from 'classnames';
import './indicator.scss';

export default class IndicatorMain extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		dataLoading: PropTypes.bool,
		years: PropTypes.array,
		indicator: PropTypes.object,
		data: PropTypes.array,
		loadIndicatorData: PropTypes.func,
		currentYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	};

	constructor(props) {
		super(props);
		this.handleYearChange = this.handleYearChange.bind(this);
	}

	// handleYearClick(year) {
	// 	return (event) => {
	// 		event.preventDefault();
	// 		this.props.loadIndicatorData(this.props.indicator.id, year);
	// 	};
	// };

	handleYearChange(event) {
		if (event.target.value) {
			this.props.loadIndicatorData(this.props.indicator.id, Number(event.target.value));
		}
	};

	rendersYears() {
		const {years, currentYear} = this.props;

		const defaultSelectValue = isNaN(Number(currentYear)) ? '' : Number(currentYear);
		return (
			<div className='indicator__years'>
				<select id='year' className='styled-select' onChange={this.handleYearChange} defaultValue={defaultSelectValue}>
					<option value='' hidden>Select year</option>
					{years.map(year => (
						<option key={year} data-year={year}>{year}</option>
					))}
				</select>
			</div>
		);
	}

	renderIndicator() {
		const {indicator, currentYear, data, dataLoading} = this.props;

		if (!indicator) {
			return null;
		}

		return (
			<div className='indicator'>
				<Helmet>
					<title>{getPageTitle(`${indicator.name} ${currentYear ? `- ${currentYear}` : ''}`)}</title>
				</Helmet>
				<h1>{indicator.name}</h1>
				<p>{indicator.sourceNote}</p>
				{indicator.sourceOrganization && <p>Source: {indicator.sourceOrganization}</p>}
				{this.rendersYears()}
				<IndicatorData loading={dataLoading} data={data}/>
			</div>
		);
	}

	render() {
		const {loading} = this.props;
		const classNames = classnames('indicator', {'loading': loading});

		return (
			<div className={classNames}>
				{loading ? <Loader/> : this.renderIndicator()}
			</div>
		);
	}
}
