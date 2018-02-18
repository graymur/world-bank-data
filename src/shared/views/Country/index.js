import React from 'react';
import PropTypes from 'prop-types';
import CountryProvider from 'shared/providers/Country';
import CountryMain from './components/CountryMain';

export class Country extends React.Component {
	static propTypes = {
		setTitle: PropTypes.bool,
		match: PropTypes.object
	};

	static defaultProps = {
		setTitle: true
	};

	render() {
		return (
			<CountryProvider iso2Code={this.props.match.params.iso2Code} render={data => (
				<CountryMain {...data} setTitle={this.props.setTitle} />
			)}/>
		);
	}
}

export default Country;
