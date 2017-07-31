import webpack from 'webpack';
import clientConfig from './client.babel';

export default Object.assign(clientConfig, {

	entry: Object.assign({}, clientConfig.entry, {
		
		main: [
			'webpack/hot/only-dev-server',
			clientConfig.entry.main
		]
	
	}),

	devServer: {
		hot: true,
		lazy: false,
		host: 'localhost',
		port: 3001,
		historyApiFallback: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		stats: {
			colors: true,
			maxModules: 0
		}
	},

	plugins: [

		...clientConfig.plugins,
		new webpack.HotModuleReplacementPlugin()

	]

});