import config from '../../config/config';
import express from 'express';
import opener from 'opener';
import fs from 'fs';
import path from 'path';
import './ssr/stubAssetsRequires';
import compression from 'compression';

const app = express();
app.use(compression());
app.use(express.static(config.buildDir));

const htmlTemplate = fs.readFileSync(path.join(config.buildDir, 'index.template.html')).toString();

app.use('*', async (req, res) => {
	let html = htmlTemplate;

	if (process.env.SSR && req.originalUrl !== '/favicon.ico') {
		const [content, state] = await require('./ssr').default(req);
		html = html.replace('<div id="react-root"></div>', `<div id="react-root">${content}</div>`);
		html = html.replace('window.__INITIAL_STATE__ = {}', `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`);
	}

	res.send(html);
});

app.listen(config.port, () => {
	console.log(`Listening at ${config.host}:${config.port}`);
	opener(`http://${config.host}:${config.port}`);
});
