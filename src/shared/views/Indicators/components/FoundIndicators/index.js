import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Loader from 'shared/components/Loader';
import IndicatorsList from '../IndicatorsList';
import SearchIndicators from 'shared/providers/SearchIndicators';

export default class FoundIndicators extends React.Component {
	static propTypes = {
		pattern: PropTypes.string
	};

	renderFoundList(foundIndicators) {
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

	renderFoundIndicators({loading, foundIndicators}) {
		if (!loading && !foundIndicators) {
			return null;
		}

		let content = '';

		if (loading) {
			content = <Loader/>;
		} else if (foundIndicators.length) {
			content = this.renderFoundList(foundIndicators);
		} else {
			content = this.renderNotFound();
		}

		const className = classnames(
			'indicators__search__result',
			{'loading': loading},
			{'_found': foundIndicators && foundIndicators.length > 0}
		);

		return (
			<div className={className}>
				{content}
			</div>
		);
	}

	render() {
		const {pattern} = this.props;

		if (!pattern || pattern.length < 3) {
			return null;
		}

		return (
			<SearchIndicators pattern={pattern} render={(data) =>
				this.renderFoundIndicators(data)
			}/>
		);
	}
}
