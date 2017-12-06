import path from 'path';
import {} from './env';

export default {
	srcDir: path.resolve(path.join(__dirname, '/../src')),
	serverDir: path.resolve(path.join(__dirname, '/../src/server')),
	clientDir: path.resolve(path.join(__dirname, '/../src/client')),
	sharedDir: path.resolve(path.join(__dirname, '/../src/shared')),
	sourceDir: path.resolve(path.join(__dirname, '/../src')),
	buildDir: path.resolve(path.join(__dirname, '/../build')),
	dllDir: path.join(path.resolve(path.join(__dirname, '/../node_modules')), '_dll'),
	dllFileName: 'vendors.js',
	port: process.env.PORT || 3000,
	host: 'localhost'
};
