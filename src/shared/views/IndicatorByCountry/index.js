import React from 'react';
import PropTypes from 'prop-types';
import IndicatorByCountryMain from './components/IndicatorByCountryMain';
import {countryQuery} from 'shared/providers/Country';
import {indicatorQuery} from 'shared/providers/Indicator';
import {indicatorDataByCountryQuery} from 'shared/providers/IndicatorDataByCountry';

import { graphql, compose } from 'react-apollo';

export class IndicatorByCountry extends React.Component {
	static propTypes = {
		match: PropTypes.object,
		country: PropTypes.object,
		indicator: PropTypes.object,
		data: PropTypes.object
	};

	render() {
		return <IndicatorByCountryMain
			match={this.props.match}
			country={this.props.country.country}
			indicator={this.props.indicator.indicator}
			data={this.props.data.indicatorDataByCountry}
		/>;
	}
}

export default compose(
	graphql(indicatorDataByCountryQuery, {
		name: 'data',
		options: ownProps => ({ variables: { indicatorId: ownProps.match.params.indicatorId, iso2Code: ownProps.match.params.iso2Code } })
	}),
	graphql(countryQuery, {
		name: 'country',
		options: ownProps => ({ variables: { iso2Code: ownProps.match.params.iso2Code } })
	}),
	graphql(indicatorQuery, {
		name: 'indicator',
		options: ownProps => ({ variables: { id: ownProps.match.params.indicatorId } })
	})
)(IndicatorByCountry);
