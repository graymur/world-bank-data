import webpack from 'webpack';

export default new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false,
		unsafe: true
	},
	output: {
		comments: function(node, comment) {
			if (comment.type === 'comment2') {
				return /@copyright/i.test(comment.value);
			}
		}
	}
});

// import {webpack} from 'google-closure-compiler-js';
// const path = require('path');
//
// const plugin = webpack({
// 	options: {
// 		languageIn: 'ECMASCRIPT6',
// 		languageOut: 'ECMASCRIPT5',
// 		compilationLevel: 'ADVANCED',
// 		warningLevel: 'VERBOSE'
// 	}
// });
//
// export default plugin;
