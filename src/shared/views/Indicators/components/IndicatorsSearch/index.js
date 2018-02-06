import React from 'react';
import PropTypes from 'prop-types';
import FoundIndicators from '../FoundIndicators';
import debounce from 'lodash/debounce';
import './indicators-search.scss';

export default class IndicatorsSearch extends React.Component {
	static propTypes = {
		searchString: PropTypes.string,
		setSearchString: PropTypes.func,
		initiateSearch: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.hadleSearchInputChange = this.hadleSearchInputChange.bind(this);
		this.hadleSearchButtonClick = this.hadleSearchButtonClick.bind(this);
		this.state = {searchString: this.props.searchString};
		this.setSearchString = debounce(this.props.setSearchString, 300);
	}

	hadleSearchButtonClick(even) {
		this.props.initiateSearch(this.state.searchString);
	}

	hadleSearchInputChange(event) {
		this.setState({searchString: event.target.value});
		this.setSearchString(event.target.value);
	}

	render() {
		const {searchString} = this.props;

		return (
			<div className='indicators__search form-group'>
				<div className='row'>
					<div className='col-sm-4 indicators__search__input-wr'>
						<input value={this.state.searchString} placeholder='Search indicators' name='indicator'
							className='indicators__search__input form-control'
							onChange={this.hadleSearchInputChange}/>
					</div>
					<div className='col-sm-8'>
						<button className='btn btn-secondary indicators__search__submit'
							onClick={this.hadleSearchButtonClick} disabled={searchString.length < 3}>
							Search
						</button>
					</div>
				</div>
				<FoundIndicators pattern={searchString}/>
			</div>
		);
	}
}
