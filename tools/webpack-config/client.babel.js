import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import path from 'path';
import commonConfig from './common.babel';
import stylesLoaders from '../loaders/styles';

const config = Object.assign(commonConfig, {
	
	entry: {
		
		main: './src/client',
		vendors: './src/vendors'
	
	},

	output: {
	
		filename: '[name].js',
		path: path.resolve(__dirname, '..', '..', 'dist', 'public')

	},

	plugins: [

		...commonConfig.plugins,

		new webpack.DefinePlugin({
			
			'process.env.STATIC': JSON.stringify(process.env.STATIC)

		}),

		new webpack.optimize.CommonsChunkPlugin({
			
			name: !process.env.STATIC ? ['vendors', `${process.env.NODE_ENV === 'development' ? '' : '../'}manifest`] : ['vendors'],
			minChunks: Infinity
		
		}),

		new webpack.NoEmitOnErrorsPlugin(),

		new webpack.LoaderOptionsPlugin({
			debug: true
		})

	]

});

/**
 * Use style loader in development environment for performance reasons
 */

if (process.env.NODE_ENV === 'development') {
	
	// devtool: 'nosources-source-map',
	config.devtool = 'eval';

	config.module.rules.push(

		{

			test: /\.scss$/,
			exclude: /node_modules/,
			use: ['style-loader'].concat(stylesLoaders)
			
		}

	);
	
		
};

/**
 * Use Extract text in production or static environment
 */

if (
	process.env.NODE_ENV === 'production'
	|| process.env.STATIC
) {

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
	
};

/**
 * Long term caching
 */

if (
	process.env.NODE_ENV === 'production'
	&& !process.env.STATIC
) {

	config.output.filename = '[name].[chunkhash:5].js';

	config.plugins.push(

		/**
		 * Configure webpack to choose ids in a deterministic way.
		 */

		new webpack.NamedModulesPlugin(),
		
		/**
		 * Extract assets url with hash in json file
		 */

		new WebpackAssetsManifest({

			output: '../manifest.json'

		})

	);

}

/**
 * Create static index.html in development or static environment
 */

if (
	process.env.NODE_ENV === 'development'
	|| process.env.STATIC
) {

	config.plugins.push(
		
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			filename: 'index.html'
		})
	
	);

};

export default config;