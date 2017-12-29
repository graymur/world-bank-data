import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './suggest-data.scss';

export class SuggestData extends React.PureComponent {
	static propTypes = {
		indicatorId: PropTypes.string,
		suggestData: PropTypes.object
	};

	render() {
		const {suggestData, indicatorId} = this.props;

		const years = Object.keys(suggestData).sort();

		if (!years.length) {
			return null;
		}

		return (
			<div className='indicator__data__suggestions'>
				Try these years instead:
				{years.map(year => (
					<Link to={`/indicators/${indicatorId}/${year}#chart`} key={year} className='indicator__data__suggestions__item'>{year}</Link>
				))}
			</div>
		);
	}
}

export default SuggestData;
