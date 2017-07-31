const path = require('path');

module.exports = {

	SRC: path.resolve(__dirname, '..', 'src'),
	COMMON: path.resolve(__dirname, '..', 'src', 'common'),
	ASSETS: path.resolve(__dirname, '..', 'src', 'common', 'assets'),
	CLIENT: path.resolve(__dirname, '..', 'src', 'client'),
	STATIC: path.resolve(__dirname, '..', 'src', 'static'),
	COMPONENTS: path.resolve(__dirname, '..', 'src', 'common', 'components'),
	PUBLIC: path.resolve(__dirname, '..', 'dist', process.env.STATIC ? '' : 'public'),
	SERVER: path.resolve(__dirname, '..', 'src', 'server'),
	DIST: path.resolve(__dirname, '..', 'dist')

};