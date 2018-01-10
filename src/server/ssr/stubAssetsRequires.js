import config from 'config';

const filenameToRelativeURL = (module, filename) => {
	module.exports = filename
		.replace(config.srcDir, '')
		.replace(/\\/g, '/');
};

require.extensions['.jpg'] = filenameToRelativeURL; // eslint-disable-line
require.extensions['.png'] = filenameToRelativeURL; // eslint-disable-line
require.extensions['.scss'] = () => {}; // eslint-disable-line
