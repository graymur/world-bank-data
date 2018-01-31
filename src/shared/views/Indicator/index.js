import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// import loadIndicatorIfNeeded from 'shared/logic/loadIfNeeded/indicator';
// import loadIndicatorDataIfNeeded from 'shared/logic/loadIfNeeded/indicatorData';
// import {loadIndicatorData} from 'shared/logic/indicator/sagas/loadIndicatorData';
import * as actions from 'shared/logic/indicator/actions';
import * as selectors from 'shared/logic/indicator/selectors';
import IndicatorMain from './components/IndicatorMain';
import {withRouter} from 'react-router-dom';
import range from 'lodash/range';
import getMaxIndicatorYear from 'shared/utils/getMaxIndicatorYear';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const years = range(1990, getMaxIndicatorYear() + 1).reverse();

const indicatorQuery = gql`
    query indicatorQuery($id: String!) {
        indicator(id: $id) {
			id,
            name,
            sourceNote,
            sourceOrganization
        }
    }
`;

export class Indicator extends React.Component {
	static propTypes = {
		data: PropTypes.object,
		years: PropTypes.array,
		currentYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		// indicatorData: PropTypes.array,
		setCurrentYear: PropTypes.func,
		// suggestData: PropTypes.object,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
			location: PropTypes.object
		})
	};

	static defaultProps = {years};

	constructor(props) {
		super(props);
		this.changeYear = this.changeYear.bind(this);
	}

	changeYear(year) {
		const {history} = this.props;
		const {indicator} = this.props.data;
		history.push(`/indicators/${indicator.id}/${year}#chart`);
		this.props.setCurrentYear(year);
	}

	render() {
		return <IndicatorMain {...this.props} {...this.props.data} changeYear={this.changeYear}/>;
	}
}

const mapStateToProps = createStructuredSelector(selectors);

const ConnectedIndicator = connect(mapStateToProps, actions)(withRouter(Indicator));

export default graphql(indicatorQuery, {
	options: ownProps => ({ variables: { id: ownProps.match.params.indicatorId } })
})(ConnectedIndicator);
