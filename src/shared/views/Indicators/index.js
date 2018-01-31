import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import searchIndicatorsIfNeeded from 'shared/logic/loadIfNeeded/searchIndicatorsIfNeeded';
import {searchIndicators} from 'shared/logic/indicators/sagas/searchIndicators';
import * as actions from 'shared/logic/indicators/actions';
import * as selectors from 'shared/logic/indicators/selectors';
import IndicatorsMain from './components/IndicatorsMain';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const indicatorsQuery = gql`
	query indicatorsQuery{ 
		indicators {
			id,
			name
		}
}`;

export class Indicators extends React.Component {
	static propTypes = {
		data: PropTypes.object,
		loading: PropTypes.bool,
		indicators: PropTypes.array,
		loadIndicators: PropTypes.func,
		userIndicators: PropTypes.array,
		foundIndicators: PropTypes.array,
		searching: PropTypes.bool,
		searchIndicators: PropTypes.func,
		setFoundIndicators: PropTypes.func,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
			location: PropTypes.object
		})
	};

	static preload = match => {
		return [
			match.params.search && [searchIndicators, actions.searchIndicators(match.params.search)]
		];
	};

	constructor(props) {
		super(props);
		this.initiateSearch = this.initiateSearch.bind(this);
		this.clearSearchResults = this.clearSearchResults.bind(this);
	}

	clearSearchResults() {
		this.props.setFoundIndicators();
		this.props.history.push(`/indicators`);
	}

	initiateSearch(value) {
		const {history, searchIndicators} = this.props;
		history.push(`/indicators?search=${encodeURIComponent(value)}`);
		searchIndicators(value);
	}

	componentDidMount() {
		searchIndicatorsIfNeeded(this.props, this.props.searchIndicators);
	}

	render() {
		return <IndicatorsMain {...this.props} {...this.props.data} clearSearchResults={this.clearSearchResults} initiateSearch={this.initiateSearch}/>;
	}
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.selectLoading,
	indicators: selectors.selectIndicators,
	searching: selectors.selectSearching,
	searchString: selectors.selectSearchString,
	foundIndicators: selectors.selectFoundIndicators
});

const ConnectedIndicators = connect(mapStateToProps, actions)(Indicators);

export default graphql(indicatorsQuery)(ConnectedIndicators);
