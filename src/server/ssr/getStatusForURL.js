import {matchPath} from 'react-router-dom';

export default (routes, url) => {
	return routes.reduce((status, route) => {
		const match = matchPath(url, route);

		if (match && route.path !== '*') {
			return route.status || 200;
		}

		return status;
	}, 404);
};
