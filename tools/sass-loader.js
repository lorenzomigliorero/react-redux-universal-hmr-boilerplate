import sass from 'node-sass';
import path from 'path';
import jsonImporter from 'node-sass-json-importer';

module.exports = (data, file) => {

	try {
		
		return sass.renderSync({
			data: `@import \'base.scss\'; ${data}`,
			file,
			importer: [
				jsonImporter
			],
			includePaths: [
				path.resolve(__dirname, '..', 'src', 'styles')
			]
		}).css.toString('utf8');
	
	} catch (e) {
		
		console.error(e);
	
	}

};