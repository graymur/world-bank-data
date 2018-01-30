import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import getPageTitle from 'shared/utils/getPageTitle';
import loadIndicatorsIfNeeded from 'shared/logic/loadIfNeeded/indicators';
import {selectIndicators} from 'shared/logic/indicators/selectors';
import {loadIndicators} from 'shared/logic/indicators/actions';
import {loadIndicators as loadIndicatorsSaga} from 'shared/logic/indicators/sagas/loadIndicators';
import Loader from 'shared/components/Loader';
import classnames from 'classnames';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import './country.scss';

const countryQuery = gql`
	query countryQuery($iso2Code: String!) {
		country(iso2Code: $iso2Code) {
			name
			iso2Code
			region
			incomeLevel
			capitalCity
		}
	}
`;

export class Country extends React.Component {
	static propTypes = {
		data: PropTypes.object,
		setTitle: PropTypes.bool,
		indicators: PropTypes.array,
		loadIndicators: PropTypes.func
	};

	static defaultProps = {
		setTitle: true
	};

	static preload = match => [
		[loadIndicatorsSaga]
	];

	componentDidMount() {
		loadIndicatorsIfNeeded(this.props, this.props.loadIndicators);
	}

	renderCountry() {
		const {setTitle} = this.props;
		const {country} = this.props.data;

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
					{this.props.indicators.map(indicator => (
						<Link
							key={indicator.id} className='indicators__list__item'
							to={`/countries/${country.iso2Code}/indicator/${indicator.id}`}>{indicator.name}</Link>
					))}
				</nav>
			</div>
		);
	}

	render() {
		const {loading} = this.props.data;
		const classNames = classnames('country', {'loading': loading});

		return (
			<div className={classNames}>
				{loading ? <Loader/> : this.renderCountry()}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	indicators: selectIndicators
});

const ConnectedCountry = connect(mapStateToProps, {loadIndicators})(Country);

export default graphql(countryQuery, {
	options: ownProps => ({ variables: { iso2Code: ownProps.match.params.iso2Code } })
})(ConnectedCountry);
