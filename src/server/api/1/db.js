import config from 'config';
import mongoose from 'mongoose';

mongoose.Promise = Promise;
mongoose.connect(config.mongoUrl, {useMongoClient: true});
const db = mongoose.connection;

db.on('error', err => {
	console.log('connection error:', err.message);
});

db.once('open', callback => console.log('Connected to DB!'));

export default db;
