import config from '../../config/config';
import express from 'express';
import opener from 'opener';
import fs from 'fs';
import path from 'path';
import compression from 'compression';
import './ssr/stubAssetsRequires';
import api from './api/1/index';

const app = express();
app.use(compression());
app.use(express.static(config.buildDir));
app.use('/api/1/', api);

const htmlTemplate = fs.readFileSync(path.join(config.buildDir, 'index.template.html')).toString();

app.use('*', async (req, res) => {
	let html = htmlTemplate;

	if (process.env.SSR && req.originalUrl !== '/favicon.ico') {
		html = await require('./ssr').default(req, html);
	}

	res.send(html);
});

app.listen(config.port, () => {
	console.log(`Listening at ${config.host}:${config.port}`);
	opener(`http://${config.host}:${config.port}`);
});
