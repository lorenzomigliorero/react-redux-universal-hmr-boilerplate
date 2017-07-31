import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import commonConfig from './common.babel';
import stylesLoaders from '../webpack-loaders/styles';

import paths from '../paths';

const config = Object.assign({}, commonConfig, {
	
	target: 'web',
	
	entry: {
		
		main: './src/client/',
		vendors: './src/client/vendors'
	
	},

	output: Object.assign({}, commonConfig.output, {
	
		path: paths.PUBLIC

	}),

	plugins: [

		...commonConfig.plugins,

		new webpack.optimize.CommonsChunkPlugin({
			
			name: (() => {

				const chunks = ['vendors'];

				if (
					process.env.NODE_ENV === 'production'
					&& !process.env.STATIC
				) {

					chunks.push('../manifest');

				};

				return chunks;

			})(),
			minChunks: Infinity
		
		})

	]

});

/* eslint-disable indent */

switch (process.env.NODE_ENV) {

	case ('development'):

		/**
		 * Use style loader in development environment for HMR support
		 */

		config.devtool = 'eval';

		config.module.rules.push(

			{

				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader'].concat(stylesLoaders)
				
			}

		);
	
	break;
	
	default:
	
		/**
		 * Use Extract text in production or static environment
		 */

		config.module.rules.push(

			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: stylesLoaders
				})
			}

		);

		config.plugins.push(

			new ExtractTextPlugin({
				
				filename: process.env.STATIC ? 'style.css' : 'style.[contenthash:5].css',
				ignoreOrder: true
			
			})
		
		);

		if (!process.env.STATIC) {

			config.output.filename = '[name].[chunkhash:5].js';

			config.plugins.push(

				/**
				 * Configure webpack to choose ids in a deterministic way.
				 */

				new webpack.NamedModulesPlugin(),
			
				/**
				 * Extract assets url with hash in json file
				 * Exclude manifest.js file
				 */

				new WebpackAssetsManifest({

					output: '../manifest.json',
					customize: (key, value) => {
						if (key === '../manifest.js') {
							return {
								key: 'manifest.js',
								value: value.replace('../', '')
							};
						}
						return true;
					}

				})

			);

		};
	
}
/* eslint-enable indent */

export default config;