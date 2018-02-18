import path from 'path';
import config from '../src/config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import fs from 'fs';
import merge from 'merge-deep';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import baseWebpackConfig from './webpack.config.base';
import addExtractTextPluginToConfig from './util/addExtractTextPluginToConfig';

const nodeModules = {};
fs.readdirSync('node_modules')
	.filter(x => ['.bin'].indexOf(x) === -1)
	.forEach(mod => (nodeModules[mod] = 'commonjs ' + mod));

const webpackNode = {
	console: false,
	process: false,
	global: false,
	buffer: false,
	__filename: false,
	__dirname: false
};

baseWebpackConfig.plugins = [];

const developmentConfig = merge(
	baseWebpackConfig, {
		target: 'node',
		node: webpackNode,
		entry: {app: path.join(config.serverDir, 'serverProd.js')},
		output: {
			path: config.buildDir,
			filename: 'server.js'
		},
		externals: nodeModules,
		plugins: [
			new CopyWebpackPlugin([{
				from: path.join(config.serverDir, '/api/1/endpoints/graphql'),
				to: path.join(config.buildDir, 'graphql')
			}]),
			new ExtractTextPlugin('styles.css')
		],
		resolve: {alias: {'shared/dataSource': 'server/dataSource'}}
	});

// remove "style-loader", since it depends on window and document objects and won't work on server
developmentConfig.module.loaders = developmentConfig.module.loaders.map(loader => {
	if (loader.loaders && loader.loaders.includes('style-loader')) {
		loader.loaders = loader.loaders.filter(x => x !== 'style-loader');
	}

	return loader;
});

addExtractTextPluginToConfig(developmentConfig);

export default developmentConfig;
