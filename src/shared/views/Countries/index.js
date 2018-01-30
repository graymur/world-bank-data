import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import CountriesMain from './components/CountriesMain';

const countriesQuery = gql`query { countries { name, iso2Code } }`;

export class Countries extends React.Component {
	static propTypes = {
		data: PropTypes.object
	};

	render() {
		return <CountriesMain {...this.props.data}/>;
	}
}

export default graphql(countriesQuery)(Countries);
