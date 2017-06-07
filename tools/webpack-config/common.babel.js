import webpack from 'webpack';
import path from 'path';
import { mozjpeg, pngquant, svgo } from '../loaders/images';
import files from '../loaders/files';

let config = {
	
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
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				include: path.resolve(__dirname, '..', '..', 'src', 'assets', 'images'),
				loaders: [

					files({
						outputPath: 'assets/images/'
					}),
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg,
							pngquant,
							svgo
						}
					}
				
				]
			},
			{
				enforce: 'pre',
				test: /\.(svg)$/i,
				include: path.resolve(__dirname, '..', '..', 'src', 'assets', 'svg-inline'),
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
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				include: path.resolve(__dirname, '..', '..', 'src', 'assets', 'fonts'),
				loaders: [
					
					files({
						outputPath: 'assets/fonts/'
					})
				
				]
			},
			{
				test: /\.(wav|mp3|mp4)$/,
				include: path.resolve(__dirname, '..', '..', 'src', 'assets', 'media'),
				loaders: [
					files({
						outputPath: 'assets/media/'
					})
				]
			},

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
			components: path.resolve(__dirname, '..', '..', 'src', 'components'),
			containers: path.resolve(__dirname, '..', '..', 'src', 'containers'),
			reducers: path.resolve(__dirname, '..', '..', 'src', 'reducers'),
			state: path.resolve(__dirname, '..', '..', 'src', 'state'),
			modules: path.resolve(__dirname, '..', '..', 'src', 'styles', 'modules'),
			views: path.resolve(__dirname, '..', '..', 'src', 'views')
		}

	},

	plugins: [

	]

};

if (
	process.env.NODE_ENV === 'production'
	|| process.env.STATIC
) {

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