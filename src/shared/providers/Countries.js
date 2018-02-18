import createProviderClass from './createProviderClass';

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

export default graphql(countriesQuery)(createProviderClass('countries'));
