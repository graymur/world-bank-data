import createProviderClass from './createProviderClass';

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

export default graphql(indicatorDataByCountryQuery, {
	options: ownProps => ({ variables: { indicatorId: ownProps.match.params.indicatorId, iso2Code: ownProps.match.params.iso2Code } })
})(createProviderClass('indicatorDataByYear'));
