import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import getPageTitle from 'shared/utils/getPageTitle';
import Loader from 'shared/components/Loader';
import IndicatorData from '../IndicatorData';
// import SuggestData from '../SuggestData';
import classnames from 'classnames';
import IndicatorDataByYearProvider from 'shared/providers/IndicatorDataByYear';
import './indicator.scss';

export default class IndicatorMain extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		years: PropTypes.array,
		indicator: PropTypes.object,
		changeYear: PropTypes.func,
		currentYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	};

	constructor(props) {
		super(props);
		this.handleYearChange = this.handleYearChange.bind(this);
	}

	handleYearChange(event) {
		if (event.target.value) {
			this.props.changeYear(Number(event.target.value));
		}
	};

	rendersYears() {
		const {years, currentYear} = this.props;

		const defaultSelectValue = isNaN(Number(currentYear)) ? '' : Number(currentYear);
		return (
			<div className='indicator__years'>
				<select key={currentYear} id='year' className='styled-select' onChange={this.handleYearChange} defaultValue={defaultSelectValue}>
					<option value='' hidden>Select year</option>
					{years.map(year => (
						<option key={year} data-year={year}>{year}</option>
					))}
				</select>
			</div>
		);
	}

	renderIndicator() {
		const {indicator, currentYear} = this.props;

		if (!indicator) {
			return null;
		}

		return (
			<div className='indicator'>
				<Helmet>;
					<title>{getPageTitle(`${indicator.name} ${currentYear ? `- ${currentYear}` : ''}`)}</title>
				</Helmet>
				<h1>{indicator.name}</h1>
				<p>{indicator.sourceNote !== 'NULL' && indicator.sourceNote}</p>
				{indicator.sourceOrganization && <p>Source: {indicator.sourceOrganization}</p>}
				{this.rendersYears()}

				<IndicatorDataByYearProvider year={currentYear} indicatorId={indicator.id} render={({loading, indicatorDataByYear}) =>
					<IndicatorData currentYear={currentYear} indicator={indicator} loading={loading} data={indicatorDataByYear}/>
				}/>
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
