import createProviderClass from './createProviderClass';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const indicatorsQuery = gql`
    query indicatorsQuery{
        indicators {
            id,
            name
        }
    }
`;

export default graphql(indicatorsQuery)(createProviderClass('indicators'));
