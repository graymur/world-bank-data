import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const indicatorDataQuery = gql`
    query indicatorDataByYear($indicatorId: String!, $year: Int!) {
        indicatorDataByYear(indicatorId: $indicatorId, year: $year) {
            name,
            value
        }
    }
`;

export class IndicatorDataByYearProvider extends React.Component {
	static propTypes = {
		data: PropTypes.object,
		render: PropTypes.func
	};

	render() {
		const {loading, indicatorDataByYear} = this.props.data;
		return this.props.render({loading, indicatorDataByYear});
	}
}

export default graphql(indicatorDataQuery, {
	options: ownProps => ({ variables: { indicatorId: ownProps.indicatorId, year: Number(ownProps.year) } })
})(IndicatorDataByYearProvider);
