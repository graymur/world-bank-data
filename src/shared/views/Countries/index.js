import React from 'react';
import CountriesMain from './components/CountriesMain';
import CountriesProvider from 'shared/providers/Countries';

export class Countries extends React.Component {
	render() {
		return <CountriesProvider render={data => <CountriesMain {...data}/>}/>;
	}
}

export default Countries;
