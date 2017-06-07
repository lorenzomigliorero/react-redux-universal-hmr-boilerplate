import sass from 'node-sass';
import postcss from 'postcss';
import { scss, postcss as postcssconfig } from '../loaders/styles';

module.exports = (data, file) => {

	try {

		return sass.renderSync(Object.assign(scss.options, {
		
			data: postcss(postcssconfig.options.plugins).process(data.replace(/modules\//g, '../../styles/modules/'), {
			
				syntax: postcssconfig.options.syntax
			
			}).css,

			file
		
		})).css.toString('utf8');
	
	} catch (e) {
		
		console.error(e);
	
	}

	return false;

};