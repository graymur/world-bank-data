import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import getPageTitle from 'shared/utils/getPageTitle';
import classnames from 'classnames';
import Loader from 'shared/components/Loader';
import IndicatorsList from '../IndicatorsList';
import './indicators.scss';

export default class IndicatorsMain extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		indicators: PropTypes.array,
		searching: PropTypes.bool,
		userIndicators: PropTypes.array,
		foundIndicators: PropTypes.array,
		searchIndicators: PropTypes.func,
		addUserIndicator: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.hadleSearchInput = this.hadleSearchInput.bind(this);
		this.hadleFoundIndicatorClick = this.hadleFoundIndicatorClick.bind(this);
		this.searchTimeoutId = null;
	}

	hadleSearchInput(event) {
		clearTimeout(this.searchTimeoutId);

		this.searchTimeoutId = (value => setTimeout(() => {
			this.props.searchIndicators(value);
		}, 500))(event.target.value);
	}

	hadleFoundIndicatorClick(event) {
		event.preventDefault();
		this.props.addUserIndicator(event.target.getAttribute('data-id'));
	}

	renderFoundIndicators() {
		const {foundIndicators, searching} = this.props;

		if (!searching && !foundIndicators) {
			return null;
		}

		let content = '';

		if (searching) {
			content = <Loader/>;
		} else {
			content = foundIndicators.map(item => (
				<a href='' onClick={this.hadleFoundIndicatorClick} data-id={item.id} className='indicators__search__found__item btn btn-default' key={item.id}>{item.name}</a>
			));
		}

		const className = classnames('indicators__search__found', {'loading': searching});

		return (
			<div className={className}>
				{content}
			</div>
		);
	}

	renderSearch() {
		return (
			<div className='indicators__search'>
				<input placeholder='Search indicators' name='indicator' className='indicators__search__input' onChange={this.hadleSearchInput}/>
				{this.renderFoundIndicators()}
			</div>
		);
	}

	render() {
		const {loading, indicators, userIndicators} = this.props;
		const classNames = classnames('indicators__container', {'loading': loading});

		console.log('USER_INDICATORS', userIndicators);

		return (
			<div className='indicators'>
				<Helmet>
					<title>{getPageTitle('Indicators')}</title>
				</Helmet>
				<h1 className='indicators__title'>Indicators List</h1>
				<p>World Bank collects data on more then 16 thousands indicators. Here are some of them major one. You
					find others using serch field.</p>
				{this.renderSearch()}
				<h3 className='indicators__title'>Your indicators</h3>
				<div className='indicators__container'>
					<IndicatorsList indicators={userIndicators}/>
				</div>
				<h3 className='indicators__title'>Main indicators</h3>
				<div className={classNames}>
					{loading ? <Loader/> : <IndicatorsList indicators={indicators}/>}
				</div>
			</div>
		);
	}
}
