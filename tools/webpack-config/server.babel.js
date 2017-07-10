import path from 'path';
import commonConfig from './common.babel';
import externals from 'webpack-node-externals';
import webpack from 'webpack';

import stylesLoaders from '../loaders/styles';


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
		path: path.resolve(__dirname, '..', '..', 'dist')

	},

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

		externals()

	]

});