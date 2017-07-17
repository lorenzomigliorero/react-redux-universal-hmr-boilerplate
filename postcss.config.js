const autoprefixer = require('autoprefixer');
const postcssModulesValues = require('postcss-modules-values');

module.exports = ({ file, options, env }) => ({
	plugins: [
		autoprefixer(
			'last 2 versions',
			'ie 10'
		),
		postcssModulesValues
	]
});