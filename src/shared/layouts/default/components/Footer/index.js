import React from 'react';
import {pure} from 'recompose';
import './footer.scss';

const Footer = () => (
	<footer className='footer'>
		<div className='container'>
			{(new Date()).getFullYear()} <a href='https://github.com/graymur/world-bank-data' target='_blank'>graymur/world-bank-data</a>
		</div>
	</footer>
);

export default pure(Footer);
