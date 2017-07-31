import StyleLintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';
import path from 'path';
import { svgo } from '../webpack-loaders/images';
import files from '../webpack-loaders/files';
import { PUBLIC_PATH } from '../../src/common/constants';
import paths from '../paths';

const config = {
	
	output: {
	
		filename: '[name].js',
		publicPath: PUBLIC_PATH

	},

	module: {
		
		rules: [

			{
				enforce: 'pre',
				exclude: /node_modules/,
				loader: 'eslint-loader',
				test: /\.js?$/
			},
			{
				enforce: 'pre',
				include: paths.ASSETS,
				exclude: path.resolve(paths.ASSETS, 'svg-inline'),
				loaders: [

					files({
						outputPath: 'assets/'
					})
				
				]
			},
			{
				enforce: 'pre',
				test: /\.(svg)$/i,
				include: path.resolve(paths.ASSETS, 'svg-inline'),
				loaders: [

					'raw-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							svgo
						}
					}
				]
			},
			{
				enforce: 'post',
				test: /\.js?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}

		]
	
	},

	resolve: {

		extensions: [
			'.js',
			'.jsx',
			'.json',
			'.scss'
		],

		alias: {
			'@': paths.COMMON
		}

	},

	plugins: [

		new webpack.DefinePlugin({

			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.STATIC': JSON.stringify(process.env.STATIC)

		}),
		
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new StyleLintPlugin()

	]

};

if (process.env.NODE_ENV === 'production') {

	config.plugins.push(

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				join_vars: true,
				if_return: true
			},
			output: {
				comments: false
			}
		})

	);

};

export default config;