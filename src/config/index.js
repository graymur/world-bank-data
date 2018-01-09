import path from 'path';
import {} from './env';

const basePath = process.env.BASE_PATH || path.dirname(__dirname);
const buildDir = path.join(basePath, '/../build');

export default {
	srcDir: basePath,
	serverDir: path.resolve(path.join(basePath, 'server')),
	clientDir: path.resolve(path.join(basePath, 'client')),
	sharedDir: path.resolve(path.join(basePath, 'shared')),
	sourceDir: basePath,
	buildDir,
	buildPublicDir: path.join(buildDir, 'public'),
	dllDir: path.resolve(path.join(__dirname, '/../../node_modules/_dll')),
	dllFileName: 'vendors.js',
	port: process.env.PORT || 80,
	host: 'localhost',
	mongoUrl: process.env.MONGO_URL,
	securityToken: process.env.SECURITY_TOKEN
};
