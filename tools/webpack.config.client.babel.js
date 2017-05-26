import path from  'path';
import commonConfig from './webpack.config.common.babel';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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

	]

});

/**
 * Use style loader in development environment
 */

if (process.env.NODE_ENV === 'development') {

	config.module.rules = commonConfig.module.rules.concat([

		{
			test: /\.scss?$/,
			exclude: /node_modules/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					query: {
						modules: true,
						importLoaders: 1,
						localIdentName: '[name]__[local]__[hash:base64:5]'
					}
				},
				'sass-loader'
			]
		}

	]);

};

/**
 * Use Extract text in production environment
 */

if (
	process.env.NODE_ENV === 'production'
	|| process.env.STATIC
) {

	config.module.rules = commonConfig.module.rules.concat([

		{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]__[local]__[hash:base64:5]'
						}
					},
					'sass-loader'
				]
			})
		}

	]);

	config.plugins.push(

		new ExtractTextPlugin('[name].css')

	);
	
};

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