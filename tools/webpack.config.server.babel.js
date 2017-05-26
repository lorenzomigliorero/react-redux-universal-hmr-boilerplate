import path from 'path';
import commonConfig from './webpack.config.common.babel';
import externals from 'webpack-node-externals';
import webpack from 'webpack';

export default Object.assign(commonConfig, {
	
	target: 'node',

	node: {
		__dirname: false,
		__filename: false
	},

	entry: {
		
		server: [
			'./src/server'
		]
	
	},

	output: {
		
		filename: '[name].js',
		path:     path.resolve(__dirname, '..', 'dist')
	
	},

	module: {
		
		rules: commonConfig.module.rules.concat([
		
			{
				test: /\.ejs$/,
				exclude: /node_modules/,
				loader: 'ejs-loader?variable=locals'
			}
		
		])
	
	},

	plugins: commonConfig.plugins.concat([

		new webpack.DefinePlugin({
			
			'process.env.BABEL_ENV': JSON.stringify(process.env.BABEL_ENV)

		})

	]),

	externals: [

		externals()

	]

});