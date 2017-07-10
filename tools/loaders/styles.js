import path from 'path';
import jsonImporter from 'node-sass-json-importer';
import autoprefixer from 'autoprefixer';
import postcssModulesValues from 'postcss-modules-values';

var css = {
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

var postcss = {
	loader: 'postcss-loader',
	options: {
		sourceMap: process.env.NODE_ENV === 'development'
	}
};

if (process.env.NODE_ENV === 'production') {

	postcss.options.plugins = () => [
	
		postcssModulesValues,

		autoprefixer(
			'last 2 versions',
			'ie 10'
		)

	];

};

var scss = {
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
	scss

];