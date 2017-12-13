const isSSR = require('./utils/isSSR').default;

if (!isSSR() || typeof (window) !== 'undefined') {
	module.exports = require('../client/dataSource').default;
} else {
	module.exports = require('../server/dataSource').default;
}
