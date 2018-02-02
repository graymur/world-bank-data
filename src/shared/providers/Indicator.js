import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const indicatorQuery = gql`
    query indicatorQuery($id: String!) {
        indicator(id: $id) {
            id,
            name,
            sourceNote,
            sourceOrganization
        }
    }
`;

export class IndicatorProvider extends React.Component {
	static propTypes = {
		data: PropTypes.object,
		render: PropTypes.func
	};

	render() {
		const {loading, indicator} = this.props.data;
		return this.props.render({loading, indicator});
	}
}

export default graphql(indicatorQuery, {
	options: ownProps => ({ variables: { id: ownProps.indicatorId } })
})(IndicatorProvider);
