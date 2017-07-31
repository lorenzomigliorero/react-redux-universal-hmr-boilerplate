import HtmlWebpackPlugin from 'html-webpack-plugin';
import clientConfig from './client.babel';

import pkg from '../../package.json';

const config = Object.assign({}, clientConfig, {
	
	plugins: [

		...clientConfig.plugins,
		new HtmlWebpackPlugin({
			template: './src/common/index.ejs',
			filename: 'index.html',
			env: process.env.NODE_ENV,
			inject: false,
			helmet: {
				title: `<title>${pkg.name}</title>`,
				meta: [
					`<meta name="description" content="${pkg.description}">`,
				]
			}
		})

	]

});

export default config;