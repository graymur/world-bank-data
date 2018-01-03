import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const Item = ({menuTitle, exact, path}) => (
	<NavLink exact={exact} to={path} className='main-nav__item' activeClassName='_active'>{menuTitle}</NavLink>
);

Item.propTypes = {
	menuTitle: PropTypes.string,
	exact: PropTypes.bool,
	path: PropTypes.string
};

export default Item;
