import path from  'path';
import commonConfig from './webpack.config.common.babel';

let config = Object.assign(commonConfig, {
	
	entry: {
		
		bundle: [
			'./src/client'
		]
	
	},

	output: {
	
		filename: '[name].js',
		path:     path.resolve(__dirname, '..', 'dist', 'public'),
		publicPath: ''
	
	}

});

export default config;