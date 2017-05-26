import sass from 'node-sass';
import jsonImporter from 'node-sass-json-importer';

module.exports = (data, file) => {

	try {
		
		return sass.renderSync({
			data: `@import \'../../constant/index.json\';${data}`,
			file,
			importer: [
				jsonImporter
			]
		}).css.toString('utf8');
	
	} catch (e) {
		
		console.error(e);
	
	}

};