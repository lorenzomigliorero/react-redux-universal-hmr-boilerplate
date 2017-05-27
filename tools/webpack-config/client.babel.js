import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import pkg from '../../package.json';
import _ from 'lodash';
import path from 'path';
import commonConfig from './common.babel';
import { scss, css, postcss } from '../loaders/styles';

let config = Object.assign(commonConfig, {
	
	entry: {
		
		main: './src/client',
		vendors: './src/vendors'
	
	},

	output: {
	
		filename: '[name].js',
		path:     path.resolve(__dirname, '..', '..', 'dist', 'public')

	},

	plugins: commonConfig.plugins.concat([

		new webpack.DefinePlugin({
			
			'process.env.STATIC': JSON.stringify(process.env.STATIC)

		}),

		new webpack.optimize.CommonsChunkPlugin({
			
			name: !process.env.STATIC ? ['vendors', `${process.env.NODE_ENV === 'development' ? '' : '../'}manifest`] : ['vendors'],
			minChunks: Infinity
		
		})

	]),

	module: {
		
		rules: commonConfig.module.rules.concat([

			

		])
	
	}

});

/**
 * Use style loader in development environment for performance reasons
 */

if (process.env.NODE_ENV === 'development') {
	
	config.module.rules = config.module.rules.concat([

		{

			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
				'style-loader',
				css,
				scss
			]
			
		}

	]);
		
};

/**
 * Long term caching
 */

if (
	process.env.NODE_ENV === 'production'
	&& !process.env.STATIC
) {

	config.output.filename = '[name].[chunkhash:8].js';

	config.plugins.push(

		/**
		 * Configure webpack to choose ids in a deterministic way.
		 */

		new webpack.NamedModulesPlugin(),
		
		/**
		 * Extract assets url with hash in json file
		 */

		new WebpackAssetsManifest({

			output:  '../manifest.json'

		})

	);

}

/**
 * Use Extract text in production or static environment
 */

if (
	process.env.NODE_ENV === 'production'
	|| process.env.STATIC
) {

	config.module.rules = config.module.rules.concat([

		{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					css,
					scss,
					postcss
				]
			})
		}

	]);

	config.plugins.push(

		new ExtractTextPlugin({
			
			filename: process.env.STATIC ? 'style.css' : 'style.[contenthash:5].css'
		
		})

	);
	
};

/**
 * Create static index.html in development or static environment
 */

if (
	process.env.NODE_ENV === 'development'
	|| process.env.STATIC
) {

	config.plugins.push(
		
		new HtmlWebpackPlugin({
			template: './src/views/index.ejs',
			filename: 'index.html',
			title: _.startCase(pkg.name),
			description: pkg.description
		})
	
	);

};

export default config;