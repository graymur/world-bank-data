import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Loader from 'shared/components/Loader';

export default class IndicatorsSearch extends React.Component {
	static propTypes = {
		searching: PropTypes.bool,
		foundIndicators: PropTypes.array,
		searchIndicators: PropTypes.func,
		addUserIndicator: PropTypes.func,
		clearSearchResults: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.hadleSearchInputChange = this.hadleSearchInputChange.bind(this);
		this.hadleSearchButtonClick = this.hadleSearchButtonClick.bind(this);
		this.hadleFoundIndicatorClick = this.hadleFoundIndicatorClick.bind(this);

		this.state = {searchValue: ''};
	}

	hadleSearchInputChange(event) {
		this.setState({searchValue: event.target.value});
	}

	hadleSearchButtonClick(event) {
		this.props.searchIndicators(this.state.searchValue);
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
				<a href='' onClick={this.hadleFoundIndicatorClick} data-id={item.id}
					className='indicators__search__found__item btn btn-default' key={item.id}>{item.name}</a>
			));
		}

		const className = classnames('indicators__search__found', {'loading': searching});

		return (
			<div className={className}>
				{content}
			</div>
		);
	}

	render() {
		const {foundIndicators} = this.props;
		const hasFound = foundIndicators && foundIndicators.length;

		return (
			<div className='indicators__search'>
				<input value={this.state.searchValue} placeholder='Search indicators' name='indicator'
					className='indicators__search__input' onChange={this.hadleSearchInputChange}/>
				<button onClick={this.hadleSearchButtonClick} disabled={this.state.searchValue.length < 3}>
					Search
				</button>
				{hasFound && <button onClick={this.props.clearSearchResults}>Clear results</button>}
				{this.renderFoundIndicators()}
			</div>
		);
	}
}
