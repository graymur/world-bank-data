import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import getPageTitle from 'shared/utils/getPageTitle';
import Loader from 'shared/components/Loader';
import IndicatorData from '../IndicatorData';
import SuggestData from '../SuggestData';
import classnames from 'classnames';
import './indicator.scss';

export class Indicator extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		dataLoading: PropTypes.bool,
		years: PropTypes.array,
		indicator: PropTypes.object,
		data: PropTypes.array,
		suggestData: PropTypes.object,
		loadIndicatorData: PropTypes.func,
		currentYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	};

	constructor(props) {
		super(props);
		this.handleYearChange = this.handleYearChange.bind(this);
	}

	handleYearClick(year) {
		return (event) => {
			event.preventDefault();
			this.props.loadIndicatorData(this.props.indicator.id, year);
		};
	};

	handleYearChange(event) {
		if (event.target.value) {
			this.props.loadIndicatorData(this.props.indicator.id, Number(event.target.value));
		}
	};

	renderIndicator() {
		const {indicator, years, currentYear, data, dataLoading, suggestData} = this.props;

		if (!indicator) {
			return null;
		}

		const defaultSelectValue = isNaN(Number(currentYear)) ? '' : Number(currentYear);

		return (
			<div className='indicator'>
				<Helmet>
					<title>{getPageTitle(`${indicator.name} ${currentYear ? `- ${currentYear}` : ''}`)}</title>
				</Helmet>

				<h1>{indicator.name}</h1>
				<p>{indicator.sourceNote}</p>
				{indicator.sourceOrganization && <p>Source: {indicator.sourceOrganization}</p>}
				<div className='indicator__years'>
					<select key={currentYear} className='styled-select' onChange={this.handleYearChange} defaultValue={defaultSelectValue}>
						<option value='' hidden>Select year</option>
						{years.map(year => (
							<option key={year} data-year={year}>{year}</option>
						))}
					</select>
				</div>
				<IndicatorData loading={dataLoading} data={data}/>
				<SuggestData indicatorId={indicator.id} suggestData={suggestData}/>
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

export default Indicator;
