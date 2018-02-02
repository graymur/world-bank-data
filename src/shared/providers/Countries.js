import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const countriesQuery = gql`
	query { 
		countries { 
			name, 
			iso2Code
		}
	}
`;

export class CountriesProvider extends React.Component {
	static propTypes = {
		data: PropTypes.object,
		render: PropTypes.func
	};

	render() {
		const {loading, countries} = this.props.data;
		return this.props.render({loading, countries});
	}
}

export default graphql(countriesQuery)(CountriesProvider);
