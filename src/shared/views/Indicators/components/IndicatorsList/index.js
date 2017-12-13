import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import getMaxIndicatorYear from 'shared/utils/getMaxIndicatorYear';
import {pure} from 'recompose';

const IndicatorsList = ({indicators}) => {
	return (
		<nav className='indicators__list'>
			{indicators.map(indicator => (
				<Link key={indicator.id} className='indicators__list__item'
					to={`/indicators/${indicator.id}/${getMaxIndicatorYear()}`}>{indicator.name}</Link>
			))}
		</nav>
	);
};

IndicatorsList.propTypes = {
	indicators: PropTypes.array
};

export default pure(IndicatorsList);
