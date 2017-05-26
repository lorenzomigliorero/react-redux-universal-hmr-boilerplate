import webpack from 'webpack';

let config = {
	
	module: {
		
		rules: [
			{
				// NOTE: https://github.com/MoOx/eslint-loader
				enforce: 'pre',
				exclude: /node_modules/,
				loader:  'eslint-loader',
				test:    /\.jsx?$/
			},
			{
				// NOTE: https://github.com/babel/babel-loader
				enforce: 'post',
				exclude: /node_modules/,
				loader:  'babel-loader',
				test:    /\.jsx?$/
			}
		
		]
	
	},

	resolve: {

		// NOTE: https://webpack.github.io/docs/configuration.html#resolve-extensions
		extensions: [
			'.js',
			'.jsx',
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