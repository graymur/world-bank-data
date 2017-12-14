import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const IndicatorSchema = new Schema({
	id: {type: String, required: true},
	name: {type: String, required: true},
	data: {type: Object, required: true},
	updatedAt: {type: Date}
});

IndicatorSchema.index({id: 1}, {unique: true});
IndicatorSchema.index({name: 'text'});

export const IndicatorModel = mongoose.model('Indicator', IndicatorSchema);
