import React from 'react';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import './index.scss';

export default class Index extends React.Component {
	render() {
		return (
			<div className=''>
				<Helmet>
					<title>World Bank data</title>
				</Helmet>
				<Link to='/countries'>Countries</Link><br/>
			</div>
		);
	}
}
