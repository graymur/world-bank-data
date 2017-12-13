import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const RequestCacheSchema = new Schema({
	url: {type: String, required: true},
	result: {type: Object},
	expiresAt: {type: Date}
});

RequestCacheSchema.index({url: 1}, {unique: true});
RequestCacheSchema.index({expiresAt: 1});

export const RequestCacheModel = mongoose.model('RequestCache', RequestCacheSchema);
