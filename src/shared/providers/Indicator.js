import createProviderClass from './createProviderClass';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const indicatorQuery = gql`
    query indicatorQuery($id: String!) {
        indicator(id: $id) {
            id,
            name,
            sourceNote,
            sourceOrganization
        }
    }
`;

export default graphql(indicatorQuery, {
	options: ownProps => ({ variables: { id: ownProps.indicatorId } })
})(createProviderClass('indicator'));
