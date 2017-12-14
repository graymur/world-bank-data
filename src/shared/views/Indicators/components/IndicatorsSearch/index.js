import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Loader from 'shared/components/Loader';
import IndicatorsList from '../IndicatorsList';

export default class IndicatorsSearch extends React.Component {
	static propTypes = {
		searching: PropTypes.bool,
		searchString: PropTypes.string,
		foundIndicators: PropTypes.array,
		initiateSearch: PropTypes.func,
		clearSearchResults: PropTypes.func,
		setSearchString: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.hadleSearchInputChange = this.hadleSearchInputChange.bind(this);
		this.hadleSearchButtonClick = this.hadleSearchButtonClick.bind(this);
	}

	hadleSearchInputChange(event) {
		this.props.setSearchString(event.target.value);
	}

	hadleSearchButtonClick() {
		this.props.initiateSearch(this.props.searchString);
	}

	renderFoundList() {
		const {foundIndicators} = this.props;

		return (
			<div>
				<h3 className='indicators__title'>Search results</h3>
				<IndicatorsList indicators={foundIndicators}/>
			</div>
		);
	}

	renderNotFound() {
		return (
			<h3 className='indicators__title'>Nothing found</h3>
		);
	}

	renderFoundIndicators() {
		let {foundIndicators, searching} = this.props;

		if (!searching && !foundIndicators) {
			return null;
		}

		let content = '';

		if (searching) {
			content = <Loader/>;
		} else if (foundIndicators.length) {
			content = this.renderFoundList();
		} else {
			content = this.renderNotFound();
		}

		const className = classnames(
			'indicators__search__result',
			{'loading': searching},
			{'_found': foundIndicators && foundIndicators.length > 0}
		);

		return (
			<div className={className}>
				{content}
			</div>
		);
	}

	render() {
		const {foundIndicators, searchString} = this.props;
		const hasFound = foundIndicators && foundIndicators.length > 0;

		return (
			<div className='indicators__search form-group'>
				<div className='row'>
					<div className='col-sm-4'>
						<input value={searchString} placeholder='Search indicators' name='indicator'
							className='indicators__search__input form-control'
							onChange={this.hadleSearchInputChange}/>
					</div>
					<div className='col-sm-8'>
						<button className='btn btn-secondary indicators__search__submit'
							onClick={this.hadleSearchButtonClick} disabled={searchString.length < 3}>
							Search
						</button>
						{hasFound && <button className='btn btn-secondary' onClick={this.props.clearSearchResults}>Clear
							results</button>}
					</div>
				</div>
				{this.renderFoundIndicators()}
			</div>
		);
	}
}
