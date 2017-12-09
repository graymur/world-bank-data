import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import Loader from 'shared/components/Loader';

import './countries.scss';

export class Countries extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		countries: PropTypes.array
	};

	renderCountries() {
		return (
			<ul className='countries__list'>
				{this.props.countries.map(country => (
					<li key={country.iso2Code} className='countries__list__item'>
						<Link to={`/countries/${country.iso2Code}`}>{country.name}</Link>
					</li>
				))}
			</ul>
		);
	}

	render() {
		const {loading} = this.props;

		return (
			<div className='countries'>
				<Helmet>
					<title>Countries</title>
				</Helmet>
				<h1 className='countries__title'>Countries List</h1>
				{loading ? <Loader/> : this.renderCountries()}
			</div>
		);
	}
}

export default Countries;
