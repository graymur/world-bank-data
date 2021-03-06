import fetch from 'node-fetch';
import _ from 'lodash';
import Error404 from './Error404';

export default async (url, params) => {
	const response = await fetch(url, params);

	if (response.status !== 200) {
		const e = new Error(`Response failed: ${response.status} ${response.statusText}`);
		e.status = response.status;
		throw e;
	}

	const result = await response.json();

	/**
	 * Example of error returned by API if resource is not found:
	 *
		 [
			 {
				 "message": [
					 {
						 "id": "120",
						 "key": "Invalid value",
						 "value": "The provided parameter value is not valid"
					 }
				 ]
			 }
		 ]
	 */
	if (_.get(result, '[0].message')) {
		throw new Error404(result);
	}

	return result;
};
