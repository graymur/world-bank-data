import 'regenerator-runtime/runtime';
import config from 'config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import compression from 'compression';
import api from './api/1/index';
import bodyParser from 'body-parser';

const dir = process.env.BABEL ? path.dirname(path.dirname(__dirname)) : path.dirname(__dirname);
const publicDir = path.join(dir, 'build', 'public');

const app = express();
app.use(compression());
app.use(express.static(publicDir));
app.use('/api/1/', bodyParser.json(), api);

const htmlTemplate = fs.readFileSync(path.join(publicDir, 'index.template.html')).toString();

app.use('*', async (req, res) => {
	let html = htmlTemplate;

	try {
		if (process.env.SSR && req.originalUrl !== '/favicon.ico') {
			const {content, status} = await require('./ssr').default(req, html);
			html = content;
			res.status(status);
		}
	} catch (err) {
		console.error(err);
	}

	res.send(html);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening at ${config.host || 'localhost'}:${port}`);
});
