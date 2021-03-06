import path from 'path';
import webpack from 'webpack';
import config from '../src/config';

import defaultLoaders from './util/defaultLoaders.js';

export default {
	cache: true,
	entry: {
		app: path.join(config.clientDir, 'index.js')
	},
	output: {
		path: config.buildPublicDir,
		filename: '[name].js',
		publicPath: '/'
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: config.sourceDir,
			manifest: require(path.join(config.dllDir,
				`vendors-${process.env.NODE_ENV === 'development' ? 'development' : 'production'}-manifest.json`))
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				SSR: JSON.stringify(process.env.SSR),
				WEBPACK: JSON.stringify(true)
			}
		})
	],
	module: {
		loaders: defaultLoaders
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.jsx'],
		alias: {
			style: path.join(config.sourceDir, 'style'),
			img: path.join(config.sourceDir, 'img'),
			fonts: path.join(config.sourceDir, 'fonts')
		}
	}
};
