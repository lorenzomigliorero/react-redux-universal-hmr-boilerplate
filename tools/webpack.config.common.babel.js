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
			// NOTE: https://github.com/webpack/file-loader
				exclude: /node_modules/,
				loader:  'file-loader?name=[name].[ext]',
				test:    /\.html$/
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
			'.jsx'
		]

	},

	plugins: []

};

if (process.env.NODE_ENV === 'production') {

	config.plugins.push(
	
		new webpack.optimize.UglifyJsPlugin({
			minimize: true
		})

	);

};

export default config;