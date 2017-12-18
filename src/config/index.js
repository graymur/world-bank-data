import path from 'path';
import {} from './env';

const basePath = path.dirname(__dirname);

export default {
	srcDir: basePath,
	serverDir: path.resolve(path.join(basePath, 'server')),
	clientDir: path.resolve(path.join(basePath, 'client')),
	sharedDir: path.resolve(path.join(basePath, 'shared')),
	sourceDir: basePath,
	buildDir: path.resolve(path.join(basePath, '/../build')),
	dllDir: path.resolve(path.join(__dirname, '/../../node_modules/_dll')),
	dllFileName: 'vendors.js',
	port: process.env.PORT || 3000,
	host: 'localhost',
	mongoUrl: process.env.MONGO_URL,
	securityToken: process.env.SECURITY_TOKEN
};
