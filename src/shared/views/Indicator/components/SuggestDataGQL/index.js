import React from 'react';
import PropTypes from 'prop-types';
import getYearForSuggestions from 'shared/utils/getYearForSuggestions';
import IndicatorDataByYearProvider from 'shared/providers/IndicatorDataByYear';
import './suggest-data.scss';
import {Link} from 'react-router-dom';

export class SuggestDataGQL extends React.PureComponent {
	static propTypes = {
		indicator: PropTypes.object.isRequired,
		currentYear: PropTypes.any.isRequired
	};

	render() {
		const {indicator, currentYear} = this.props;

		const years = getYearForSuggestions(currentYear);

		if (!years.length) {
			return null;
		}

		return (
			<div className='indicator__data__suggestions'>
				Try these years instead:
				{years.map(year => (
					<IndicatorDataByYearProvider key={year} year={year} indicatorId={indicator.id} render={data =>
						<Link to={`/indicators/${indicator.id}/${year}#chart`} key={year} className='indicator__data__suggestions__item'>{year}</Link>
					}/>
				))}
			</div>
		);
	}
}

export default SuggestDataGQL;
