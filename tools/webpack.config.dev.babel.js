import webpack from 'webpack';
import clientConfig from './webpack.config.client.babel';

export default Object.assign(clientConfig, {

	entry: {
		
		bundle: [
			'webpack/hot/only-dev-server',
			'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
			...clientConfig.entry.bundle
		]
	
	},

	plugins: [

		...clientConfig.plugins,

		new webpack.HotModuleReplacementPlugin()

	]

});