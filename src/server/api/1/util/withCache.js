import {RequestCacheModel} from '../models/RequestCache';
import fetch from 'node-fetch';
import {DateTime, Duration} from 'luxon';

export default async (url, ttl = {days: 1}) => {
	const cached = await RequestCacheModel.findOne({url, expiresAt: {$gt: new Date()}});

	if (cached) {
		return cached.result;
	} else {
		const response = await fetch(url);
		const result = await response.json();

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
