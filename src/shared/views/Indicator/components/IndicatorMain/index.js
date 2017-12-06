import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Loader from 'shared/components/Loader';
import IndicatorData from '../IndicatorData';
import './indicator.scss';

export class Indicator extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		dataLoading: PropTypes.bool,
		years: PropTypes.array,
		indicator: PropTypes.object,
		data: PropTypes.array,
		loadIndicatorData: PropTypes.func,
		currentYear: PropTypes.number
	};

	handleYearClick(year) {
		return (event) => {
			event.preventDefault();
			this.props.loadIndicatorData(this.props.indicator.id, year);
		};
	};

	renderIndicator() {
		const {indicator, years, currentYear, data, dataLoading} = this.props;

		if (!indicator) {
			return null;
		}

		return (
			<div className='indicator'>
				<h1>{indicator.name}</h1>
				<p>{indicator.sourceNote}</p>
				{indicator.sourceOrganization && <p>Source: {indicator.sourceOrganization}</p>}
				<nav className='indicator__years'>
					{years.map(year => (
						<a key={year} data-year={year} className={'indicator__years__item' + (year === currentYear ? ' _active' : '')} href='' onClick={this.handleYearClick(year)}>{year}</a>
					))}
				</nav>
				<IndicatorData loading={dataLoading} data={data}/>
			</div>
		);
	}

	render() {
		const {loading} = this.props;

		return (
			<div className='indicator'>
				<Link to='/indicators'>Back</Link>
				{loading ? <Loader/> : this.renderIndicator()}
			</div>
		);
	}
}

export default Indicator;
