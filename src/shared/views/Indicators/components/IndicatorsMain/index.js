import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import getPageTitle from 'shared/utils/getPageTitle';
import classnames from 'classnames';
import Loader from 'shared/components/Loader';
import IndicatorsList from '../IndicatorsList';
import IndicatorsSearch from '../IndicatorsSearch';
import './indicators.scss';

export default class IndicatorsMain extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		indicators: PropTypes.array,
		searching: PropTypes.bool,
		userIndicators: PropTypes.array,
		foundIndicators: PropTypes.array,
		searchIndicators: PropTypes.func,
		addUserIndicator: PropTypes.func,
		clearSearchResults: PropTypes.func
	};

	render() {
		const {loading, indicators, foundIndicators} = this.props;
		const hasFoundIndicators = foundIndicators && foundIndicators.length > 0;
		const classNames = classnames('indicators__container', {'loading': loading});

		return (
			<div className='indicators'>
				<Helmet>
					<title>{getPageTitle('Indicators')}</title>
				</Helmet>
				<h1 className='indicators__title'>Indicators List</h1>
				<p>World Bank collects data on more then 16 thousands indicators. Here are some of them major one. You
					find others using serch field.</p>
				<IndicatorsSearch {...this.props}/>
				{hasFoundIndicators && <h3 className='indicators__title'>Main indicators</h3>}
				<div className={classNames}>
					{loading ? <Loader/> : <IndicatorsList indicators={indicators}/>}
				</div>
			</div>
		);
	}
}
