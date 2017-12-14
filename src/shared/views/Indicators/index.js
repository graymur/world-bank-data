import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import loadIndicatorsIfNeeded from 'shared/logic/loadIfNeeded/indicators';
import searchIndicatorsIfNeeded from 'shared/logic/loadIfNeeded/searchIndicatorsIfNeeded';
import {loadIndicators} from 'shared/logic/indicators/sagas/loadIndicators';
import {searchIndicators} from 'shared/logic/indicators/sagas/searchIndicators';
import * as actions from 'shared/logic/indicators/actions';
import * as selectors from 'shared/logic/indicators/selectors';
import IndicatorsMain from './components/IndicatorsMain';

export class Indicators extends React.Component {
	static propTypes = {
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
			loadIndicators,
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
		loadIndicatorsIfNeeded(this.props, this.props.loadIndicators);
		searchIndicatorsIfNeeded(this.props, this.props.searchIndicators);
	}

	render() {
		return <IndicatorsMain {...this.props} clearSearchResults={this.clearSearchResults} initiateSearch={this.initiateSearch}/>;
	}
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.selectLoading,
	indicators: selectors.selectIndicators,
	searching: selectors.selectSearching,
	searchString: selectors.selectSearchString,
	foundIndicators: selectors.selectFoundIndicators
});

export default connect(mapStateToProps, actions)(Indicators);
