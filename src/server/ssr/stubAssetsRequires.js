import config from 'config';

const filenameToRelativeURL = (module, filename) => {
	module.exports = filename
		.replace(config.srcDir, '')
		.replace(/\\/g, '/');
};

/**
 * TODO: require.extentions is deprecated, replace it
 */
require.extensions['.jpg'] = filenameToRelativeURL; // eslint-disable-line
require.extensions['.png'] = filenameToRelativeURL; // eslint-disable-line
require.extensions['.scss'] = () => {}; // eslint-disable-line
