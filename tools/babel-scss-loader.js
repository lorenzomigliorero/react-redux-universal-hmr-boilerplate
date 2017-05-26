import sass from 'node-sass';
import { scss } from './webpack-styles-loaders';

module.exports = (data, file) => {

	try {
		
		return sass.renderSync(Object.assign(scss.options, {
			data: `${scss.options.data} ${data}`,
			file
		})).css.toString('utf8');
	
	} catch (e) {
		
		console.error(e);
	
	}

};