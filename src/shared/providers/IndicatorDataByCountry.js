import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const indicatorDataByCountryQuery = gql`
    query indicatorDataByCountry($indicatorId: String!, $iso2Code: String!) {
        indicatorDataByCountry(indicatorId: $indicatorId, iso2Code: $iso2Code) {
            date,
            value
        }
    }
`;

export class indicatorDataByCountryProvider extends React.Component {
	static propTypes = {
		data: PropTypes.object,
		render: PropTypes.func
	};

	render() {
		const {loading, indicatorDataByYear} = this.props.data;
		return this.props.render({loading, indicatorDataByYear});
	}
}

export default graphql(indicatorDataByCountryQuery, {
	options: ownProps => ({ variables: { indicatorId: ownProps.match.params.indicatorId, iso2Code: ownProps.match.params.iso2Code } })
})(indicatorDataByCountryProvider);
