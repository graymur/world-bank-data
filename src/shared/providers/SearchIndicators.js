import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const searchIndicatorsQuery = gql`
    query searchIndicatorsQuery($pattern: String!) {
        foundIndicators(pattern: $pattern) {
            id,
            name
        }
    }`;

export class SearchIndicatorsProvider extends React.Component {
	static propTypes = {
		data: PropTypes.object,
		render: PropTypes.func
	};

	render() {
		const {loading, foundIndicators} = this.props.data;
		return this.props.render({loading, foundIndicators});
	}
}

export default graphql(searchIndicatorsQuery, {
	options: ownProps => ({ variables: { pattern: ownProps.pattern } })
})(SearchIndicatorsProvider);
