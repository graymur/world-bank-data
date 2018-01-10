import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default config => {
	// this will strip css from resulting file
	config.module.loaders.filter(loader =>
		loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
	).forEach(loader => {
		const [fallback, ...rest] = loader.loaders;
		loader.loader = ExtractTextPlugin.extract({
			fallback,
			use: rest
		});

		delete loader.loaders;
	});
};
