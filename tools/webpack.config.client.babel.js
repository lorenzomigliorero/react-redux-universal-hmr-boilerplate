import commonConfig from './webpack.config.common.babel';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { scss, css, postcss } from './webpack-styles-loaders';

let config = Object.assign(commonConfig, {
	
	entry: {
		
		main: [
			
			'./src/client'

		]
	
	},

	output: {
	
		filename: '[name].js',
		path:     path.resolve(__dirname, '..', 'dist', 'public'),
		publicPath: ''
	
	},

	plugins: [

		new webpack.DefinePlugin({
			
			'process.env.STATIC': JSON.stringify(process.env.STATIC)

		})

	],

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

		new ExtractTextPlugin('[name].css')

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
			filename: 'index.html'
		})
	
	);

};

export default config;