import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import searchIndicatorsIfNeeded from 'shared/logic/loadIfNeeded/searchIndicatorsIfNeeded';
import {searchIndicators} from 'shared/logic/indicators/sagas/searchIndicators';
import * as actions from 'shared/logic/indicators/actions';
import * as selectors from 'shared/logic/indicators/selectors';
import IndicatorsMain from './components/IndicatorsMain';
import IndicatorsProvider from 'shared/providers/Indicators';

export class Indicators extends React.Component {
	static propTypes = {
		loadIndicators: PropTypes.func,
		foundIndicators: PropTypes.array,
		searching: PropTypes.bool,
		searchIndicators: PropTypes.func,
		setFoundIndicators: PropTypes.func,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
			location: PropTypes.object
		})
	};

	static preload = match => ([
		match.params.search && [searchIndicators, actions.searchIndicators(match.params.search)]
	])

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
		return <IndicatorsProvider render={data =>
			<IndicatorsMain {...this.props} {...data} clearSearchResults={this.clearSearchResults} initiateSearch={this.initiateSearch}/>
		}/>;
	}
}

const mapStateToProps = createStructuredSelector({
	searching: selectors.selectSearching,
	searchString: selectors.selectSearchString,
	foundIndicators: selectors.selectFoundIndicators
});

export default connect(mapStateToProps, actions)(Indicators);
