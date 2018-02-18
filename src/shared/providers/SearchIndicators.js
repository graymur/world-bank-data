import createProviderClass from './createProviderClass';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const searchIndicatorsQuery = gql`
    query searchIndicatorsQuery($pattern: String!) {
        foundIndicators(pattern: $pattern) {
            id,
            name
        }
    }
`;

export default graphql(searchIndicatorsQuery, {
	options: ownProps => ({ variables: { pattern: ownProps.pattern } })
})(createProviderClass('foundIndicators'));
