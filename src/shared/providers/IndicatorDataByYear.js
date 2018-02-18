import createProviderClass from './createProviderClass';

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

export default graphql(indicatorDataQuery, {
	options: ownProps => ({ variables: { indicatorId: ownProps.indicatorId, year: Number(ownProps.year) } })
})(createProviderClass('indicatorDataByYear'));
