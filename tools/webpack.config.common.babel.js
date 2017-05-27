import webpack from 'webpack';
import path from 'path';

let config = {
	
	module: {
		
		rules: [
			{
				// NOTE: https://github.com/MoOx/eslint-loader
				enforce: 'pre',
				exclude: [/node_modules/],
				loader:  'eslint-loader',
				test:    /\.js?$/
			},
			{
				// NOTE: https://github.com/babel/babel-loader
				enforce: 'post',
				exclude: [/node_modules/],
				loader:  'babel-loader',
				test:    /\.js?$/
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				exclude: [/node_modules/],
				loaders: [
					{
						loader: 'file-loader',
						options: {
							
							name: process.env.NODE_ENV === 'development' || process.env.static ? '[name].[ext]' : '[name].[hash:8].[ext]',
							outputPath: 'assets/',
							emitFile: process.env.BABEL_ENV !== 'node'
						
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
							
								quality: 65
							
							},
							pngquant: {
								
								quality: 65,
								speed: 4
							
							},
							svgo: {
								plugins: [
									{
										removeViewBox: false
									},
									{
										removeEmptyAttrs: false
									}
								]
							}
						}
					}
				]
			},
			{
				test: /\.(eot|ttf|otf|woff|woff2|wav|mp3|mp4|ico)$/,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							name: process.env.NODE_ENV === 'development' || process.env.static ? '[name].[ext]' : '[name].[hash:8].[ext]',
							outputPath: 'assets/',
							emitFile: process.env.BABEL_ENV !== 'node'
						}
					}
					// 'image-webpack'
				],
			}
		
		]
	
	},

	resolve: {

		// NOTE: https://webpack.github.io/docs/configuration.html#resolve-extensions
		extensions: [
			'.js',
			'.jsx',
			'.json',
			'.scss'
		]

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