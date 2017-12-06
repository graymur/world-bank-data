import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import loadCountriesIfNeeded from 'shared/logic/loadIfNeeded/countries';
import {loadCountries} from 'shared/logic/countries/sagas/loadCountries';
import * as actions from 'shared/logic/countries/actions';
import * as selectors from 'shared/logic/countries/selectors';
import CountriesMain from './components/CountriesMain';

export class Countries extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		countries: PropTypes.array,
		loadCountries: PropTypes.func
	};

	static preload = () => [[loadCountries]];

	componentDidMount() {
		loadCountriesIfNeeded(this.props, this.props.loadCountries);
	}

	render() {
		const {loading, countries} = this.props;
		return <CountriesMain loading={loading} countries={countries}/>;
	}
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.selectLoading(),
	countries: selectors.selectCountries()
});

export default connect(mapStateToProps, actions)(Countries);
