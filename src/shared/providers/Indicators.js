import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const indicatorsQuery = gql`
    query indicatorsQuery{
        indicators {
            id,
            name
        }
    }`;

export class IndicatorsProvider extends React.Component {
	static propTypes = {
		data: PropTypes.object,
		render: PropTypes.func
	};

	render() {
		const {loading, indicators} = this.props.data;
		return this.props.render({loading, indicators});
	}
}

export default graphql(indicatorsQuery)(IndicatorsProvider);
