import path from 'path';
import jsonImporter from 'node-sass-json-importer';


const css = {
	loader: 'css-loader',
	options: {
		modules: true,
		importLoaders: 1,
		localIdentName: '[name]__[local]'
	}
};

if (process.env.SSR) {

	css.loader += '/locals';

};

if (process.env.NODE_ENV === 'development') {

	css.options.sourceMap = true;

};

if (process.env.NODE_ENV === 'production') {

	css.options.localIdentName = '[hash:base64:5]';

};

const postcss = {
	loader: 'postcss-loader',
	options: {
		sourceMap: process.env.NODE_ENV === 'development'
	}
};

const scss = {
	loader: 'sass-loader',
	options: {
		importer: jsonImporter,
		includePaths: [
			path.resolve(__dirname, '..', '..', 'src', 'styles'),
			'node_modules'
		]
	}
};

if (process.env.NODE_ENV === 'development') {

	scss.options.sourceMap = true;

};

export default [

	css,
	postcss,
	scss

];