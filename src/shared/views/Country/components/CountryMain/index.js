import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import getPageTitle from 'shared/utils/getPageTitle';
import Loader from 'shared/components/Loader';
import IndicatorsProvider from 'shared/providers/Indicators';
import classnames from 'classnames';
import './country.scss';

export default class Country extends React.Component {
	static propTypes = {
		setTitle: PropTypes.bool,
		loading: PropTypes.bool,
		country: PropTypes.object
	};

	static defaultProps = {
		setTitle: true
	};

	renderCountry(country) {
		const {setTitle} = this.props;

		if (!country) {
			return null;
		}

		return (
			<div className='country'>
				{setTitle && <Helmet><title>{getPageTitle(country.name)}</title></Helmet>}
				<h1>{country.name}</h1>
				<p>Region: {country.region.value}</p>
				<p>Income level: {country.incomeLevel.value}</p>
				<p>Capital city: {country.capitalCity}</p>
				<h1>Indicators</h1>
				<nav className='indicators__list'>
					<IndicatorsProvider render={({indicators}) => (indicators || []).map(indicator => (
						<Link
							key={indicator.id} className='indicators__list__item'
							to={`/countries/${country.iso2Code}/indicator/${indicator.id}`}>{indicator.name}</Link>
					))}/>
				</nav>
			</div>
		);
	}

	render() {
		const {loading, country} = this.props;

		const classNames = classnames('country', {'loading': loading});

		return (
			<div className={classNames}>
				{loading ? <Loader/> : this.renderCountry(country)}
			</div>
		);
	}
}
