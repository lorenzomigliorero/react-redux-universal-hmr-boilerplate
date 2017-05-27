import webpack from 'webpack';
import clientConfig from './client.babel';

export default Object.assign(clientConfig, {

	entry: Object.assign(clientConfig.entry, {
		
		main: [
			'webpack/hot/only-dev-server',
			'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
			clientConfig.entry.main
		]
	
	}),

	plugins: [

		...clientConfig.plugins,

		new webpack.HotModuleReplacementPlugin()

	]

});