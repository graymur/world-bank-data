import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import loadIndicatorsIfNeeded from 'shared/logic/loadIfNeeded/indicators';
import {loadIndicators} from 'shared/logic/indicators/sagas/loadIndicators';
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
		setFoundIndicators: PropTypes.func
	};

	static preload = () => [[loadIndicators]];

	constructor(props) {
		super(props);
		this.clearSearchResults = this.props.setFoundIndicators.bind(null, undefined);
	}

	componentDidMount() {
		loadIndicatorsIfNeeded(this.props, this.props.loadIndicators);
	}

	render() {
		return <IndicatorsMain {...this.props} clearSearchResults={this.clearSearchResults}/>;
	}
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.selectLoading,
	indicators: selectors.selectIndicators,
	userIndicators: selectors.selectUserIndicators,
	searching: selectors.selectSearching,
	foundIndicators: selectors.selectFoundIndicators
});

export default connect(mapStateToProps, actions)(Indicators);
