import path from 'path';
import jsonImporter from 'node-sass-json-importer';
import autoprefixer from 'autoprefixer';
import postcssModulesValues from 'postcss-modules-values';

export const css = {
	loader: 'css-loader',
	options: {
		modules: true,
		importLoaders: 1,
		localIdentName: '[name]__[local]'
	}
};

if (process.env.NODE_ENV === 'development') {

	css.options.sourceMap = true;

};

if (process.env.NODE_ENV === 'production') {

	css.options.localIdentName = '[hash:base64:5]';

};

export const postcss = {
	loader: 'postcss-loader',
	options: {
		sourceMap: process.env.NODE_ENV === 'development',
		syntax: process.env.BABEL_ENV ? require('postcss-scss') : 'postcss-scss'
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

export const scss = {
	loader: 'sass-loader',
	options: {
		importer: jsonImporter,
		includePaths: [
			path.resolve(__dirname, '..', '..', 'src', 'styles')
		]
	}
};

if (process.env.NODE_ENV === 'development') {

	scss.options.sourceMap = true;

};