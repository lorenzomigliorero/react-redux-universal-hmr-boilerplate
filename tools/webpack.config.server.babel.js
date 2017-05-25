import fs from 'fs';
import path from 'path';
import commonConfig from './webpack.config.common.babel';

export default Object.assign(commonConfig, {
	
	target: 'node',

	node: {
		__dirname: false,
		__filename: false
	},

	entry: {
		
		server: [
			'./src/server'
		]
	
	},

	output: {
		
		filename: '[name].js',
		path:     path.resolve(__dirname, '..', 'dist')
	
	},

	// SEE: http://jlongster.com/Backend-Apps-with-Webpack--Part-I
	externals: fs.readdirSync('node_modules').reduce((accumulator, module) => {
		accumulator[module] = 'commonjs ' + module;
		return accumulator;
	}, {})

});