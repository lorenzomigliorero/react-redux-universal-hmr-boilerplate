import path from  'path';
import jsonImporter from 'node-sass-json-importer';
import autoprefixer from 'autoprefixer';

export const css = {
	loader: 'css-loader',
	options: {
		modules: true,
		importLoaders: 1,
		localIdentName: process.env.NODE_ENV === 'development' ? '[name]__[local]' : '[name]__[local]__[hash:base64:8]'
	}
};

export const scss = {
	loader: 'sass-loader',
	options: {
		data: '@import \'./styles/base.scss\';',
		importer: jsonImporter,
		includePaths: [
			path.resolve(__dirname, '..', '..', 'src')
		]
	}
};

export const postcss = {
	loader: 'postcss-loader',
	options: {
		plugins: [
			autoprefixer('last 2 versions', 'ie 10')
		]
	}
};