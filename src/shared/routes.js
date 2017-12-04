import Index from 'shared/views/Index';
import Countries from 'shared/views/Countries';
import Country from 'shared/views/Country';
import Indicators from 'shared/views/Indicators';
import Indicator from 'shared/views/Indicator';
import IndicatorByCountry from 'shared/views/IndicatorByCountry';

export default [{
	path: '/',
	exact: true,
	component: Index,
	menuTitle: 'Main page'
}, {
	path: '/countries',
	exact: true,
	component: Countries,
	menuTitle: 'Countries'
}, {
	path: '/countries/:iso2Code',
	exact: true,
	component: Country
}, {
	path: '/indicators',
	exact: true,
	component: Indicators,
	menuTitle: 'Indicators'
}, {
	path: '/indicators/:indicatorId',
	exact: true,
	component: Indicator
}, {
	path: '/countries/:iso2Code/indicator/:indicatorId',
	exact: true,
	component: IndicatorByCountry
}];
