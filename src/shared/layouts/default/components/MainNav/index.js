import React from 'react';
import Item from './Item';
import routes from 'shared/routes';

const MainNav = () => (
	<nav className='main-nav'>
		{routes.filter(x => x.menuTitle).map(route => <Item key={route.path} {...route}/>)}
	</nav>
);

export default MainNav;
