import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import * as actions from 'shared/logic/indicators/actions';
import * as selectors from 'shared/logic/indicators/selectors';
import IndicatorsMain from './components/IndicatorsMain';
import IndicatorsProvider from 'shared/providers/Indicators';
import queryString from 'query-string';

export class Indicators extends React.Component {
	static propTypes = {
		location: PropTypes.object,
		setSearchString: PropTypes.func,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
			location: PropTypes.object
		})
	};

	constructor(props) {
		super(props);
		this.initiateSearch = this.initiateSearch.bind(this);
		this.clearSearchResults = this.clearSearchResults.bind(this);
	}

	clearSearchResults() {
		this.props.history.push(`/indicators`);
	}

	initiateSearch(value) {
		this.props.history.push(`/indicators?search=${encodeURIComponent(value)}`);
	}

	componentDidMount() {
		const parsed = queryString.parse(this.props.location.search);

		if (parsed.search) {
			return this.props.setSearchString(parsed.search);
		}
	}

	render() {
		return <IndicatorsProvider render={data =>
			<IndicatorsMain {...this.props} {...data} clearSearchResults={this.clearSearchResults} initiateSearch={this.initiateSearch}/>
		}/>;
	}
}

const mapStateToProps = createStructuredSelector({
	searchString: selectors.searchString
});

export default connect(mapStateToProps, actions)(Indicators);
