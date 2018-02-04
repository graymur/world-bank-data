import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const countryQuery = gql`
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

export class CountryProvider extends React.Component {
	static propTypes = {
		data: PropTypes.object,
		render: PropTypes.func
	};

	render() {
		const {loading, country} = this.props.data;
		return this.props.render({loading, country});
	}
}

export default graphql(countryQuery, {
	options: ownProps => ({ variables: { iso2Code: ownProps.iso2Code } })
})(CountryProvider);
