import nodeExternals from 'webpack-node-externals';
import commonConfig from './common.babel';
import stylesLoaders from '../webpack-loaders/styles';
import paths from '../paths';

export default Object.assign({}, commonConfig, {
	
	target: 'node',

	node: {
		__dirname: false,
		__filename: false
	},

	entry: {
		
		server: process.env.NODE_ENV === 'development' ? [
			'./src/server'
		] : [
			'./src/server/server.js'
		]
	
	},

	output: Object.assign({}, commonConfig.output, {
	
		path: paths.DIST

	}),

	module: {
		
		rules: [

			...commonConfig.module.rules,

			{

				test: /\.scss$/,
				exclude: /node_modules/,
				use: stylesLoaders
				
			},

			{
				test: /\.ejs$/,
				exclude: /node_modules/,
				loader: 'ejs-loader?variable=locals'
			}

		]
	
	},

	externals: [
		
		nodeExternals({
			whitelist: [
				'webpack/hot/poll?1000'				
			]
		})

	]
	
});