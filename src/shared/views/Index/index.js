import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import getPageTitle from 'shared/utils/getPageTitle';
import './index.scss';

const Index = (props) => (
	<div className='main-page'>
		<Helmet>
			<title>{getPageTitle()}</title>
		</Helmet>
		<h1>Statistics and graphs</h1>
		<h4>Based on data provided by <a href='https://worldbank.org/' target='_blank'>World Bank.</a></h4>
		<p>
			World Bank collects a lot of data for different countries, represented by "Indicators". Indicators represent
			data like total population, gross national income, energy use, and many more. There are 16 912 indicators
			currently. This site shows data by some of them. You can view data for particular indicator, which shows
			data for all countries, or by country, giving you the dynamics of some indicator for given country over the
			years.
		</p>
		<p>Try it out:</p>
		<ul>
			<li><Link to='/indicators/NY.GDP.PCAP.CD/2016'>Countries ranked by GDP per capita, year 2016</Link></li>
			<li><Link to='/indicators/SM.POP.REFG.OR/2014'>Countries ranked by number of refugees, year 2014</Link></li>
			<li><Link to='/indicators/SP.POP.TOTL/2015'>Countries ranked by population, year 2015 (guess who's number
				one)</Link></li>
			<li><Link to='/indicators/SH.STA.SUIC.P5/2015'>Countries ranked by suicide mortality rate, year 2015</Link>
			</li>
			<li><Link to='/countries/US/indicator/FP.CPI.TOTL.ZG'>Inflation of consumer prices in US over the
				years</Link></li>
			<li><Link to='/countries/CA/indicator/SP.POP.TOTL.FE.IN'>Dynamics of female population in Canada</Link></li>
			<li><Link to='/countries/OM/indicator/GB.XPD.DEFN.GDP.ZS'>Defence spendings in Oman, years 1970-1995</Link></li>
		</ul>
	</div>
);

export default Index;
