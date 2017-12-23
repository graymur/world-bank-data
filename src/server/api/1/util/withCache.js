// import {RequestCacheModel} from '../models/RequestCache';
import {DateTime, Duration} from 'luxon';
import request from './request';

export default RequestCacheModel => async (url, ttl = {days: 1}) => {
	const cached = await RequestCacheModel.findOne({url, expiresAt: {$gt: new Date()}});

	if (cached) {
		return cached.result;
	} else {
		const result = await request(url);

		await RequestCacheModel.remove({url});

		const expiresAt = DateTime
			.utc()
			.plus(Duration.fromObject(ttl))
			.toJSDate();

		const cache = new RequestCacheModel({
			url,
			result,
			expiresAt
		});

		await cache.save();

		return result;
	}
};
