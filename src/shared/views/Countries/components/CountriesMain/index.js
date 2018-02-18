import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import Loader from 'shared/components/Loader';
import getPageTitle from 'shared/utils/getPageTitle';
import classnames from 'classnames';
import './countries.scss';

export default class CountriesMain extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		countries: PropTypes.array
	};

	renderCountries() {
		return (
			<nav className='countries__list'>
				{this.props.countries.map(country => (
					<Link key={country.iso2Code} className='countries__list__item' to={`/countries/${country.iso2Code}`}>{country.name}</Link>
				))}
			</nav>
		);
	}

	render() {
		const {loading} = this.props;
		const classNames = classnames('countries__container', {'loading': loading});

		return (
			<div className='countries'>
				<Helmet>
					<title>{getPageTitle('Countries')}</title>
				</Helmet>
				<h1 className='countries__title'>Countries List</h1>
				<div className={classNames}>
					{loading ? <Loader/> : this.renderCountries()}
				</div>
			</div>
		);
	}
}
