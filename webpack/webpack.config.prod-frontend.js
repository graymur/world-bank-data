import bundleAnalyzerPlugin from './util/bundleAnalyzerPlugin'; // eslint-disable-line
import path from 'path';
import config from '../src/config';
import merge from 'merge-deep';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import htmlPlugin from './util/htmlPlugin';
import uglifyPlugin from './util/uglifyPlugin';
import baseWebpackConfig from './webpack.config.base';
import webpack from 'webpack';
import addExtractTextPluginToConfig from './util/addExtractTextPluginToConfig';

const productionConfig = merge(
	baseWebpackConfig,
	{
		output: {
			chunkFilename: '[name].js'
		},
		plugins: [
			new CopyWebpackPlugin([{
				from: path.join(config.dllDir, `vendors.${process.env.NODE_ENV}.js`),
				to: path.join(config.buildPublicDir, 'vendors.js')
			}]),
			new ExtractTextPlugin('styles.css'),
			htmlPlugin,
			uglifyPlugin,
			// bundleAnalyzerPlugin,
			new webpack.optimize.ModuleConcatenationPlugin()
		],
		resolve: {alias: {'shared/dataSource': 'client/dataSource'}}
	}
);

addExtractTextPluginToConfig(productionConfig);

export default productionConfig;
