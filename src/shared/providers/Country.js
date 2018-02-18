import createProviderClass from './createProviderClass';

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

export default graphql(countryQuery, {
	options: ownProps => ({ variables: { iso2Code: ownProps.iso2Code } })
})(createProviderClass('country'));
