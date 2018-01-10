import path from 'path';
import config from '../src/config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import fs from 'fs';
import defaultLoaders from './util/defaultLoaders.js';

const nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function (x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function (mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

const webpackNode = {
	// do not include polyfills
	console: false,
	process: false,
	global: false,
	buffer: false,
	__filename: false,
	__dirname: false
};

const developmentConfig = {
	cache: true,
	target: 'node',
	node: webpackNode,
	entry: {app: path.join(config.serverDir, 'serverProd.js')},
	output: {
		path: config.buildDir,
		filename: 'server.js',
		publicPath: '/'
	},
	externals: nodeModules,
	plugins: [new ExtractTextPlugin('styles.css')],
	module: {loaders: defaultLoaders},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.jsx'],
		alias: {
			style: path.join(config.sourceDir, 'style'),
			img: path.join(config.sourceDir, 'img'),
			fonts: path.join(config.sourceDir, 'fonts'),
			'shared/dataSource': 'server/dataSource'
		}
	}
};

// remove "style-loader", since it depends on window and document objects and won't work on server
developmentConfig.module.loaders = developmentConfig.module.loaders.map(loader => {
	if (loader.loaders && loader.loaders.includes('style-loader')) {
		loader.loaders = loader.loaders.filter(x => x !== 'style-loader');
	}

	return loader;
});

// this will strip css from resulting file
developmentConfig.module.loaders.filter(loader =>
	loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
).forEach(loader => {
	const [fallback, ...rest] = loader.loaders;
	loader.loader = ExtractTextPlugin.extract({
		fallback,
		use: rest
	});

	delete loader.loaders;
});

export default developmentConfig;
