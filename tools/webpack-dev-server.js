import Express from 'express';
import webpack from 'webpack';
import path from 'path';
import devConfig from './webpack-config/dev.babel';

const PORT = process.env.PORT;
const app = new Express();
const compiler = webpack(devConfig);

export default app

	/**
	 * Webpack dev middleware
	 */

	.use(require('webpack-dev-middleware')(compiler, {
		
		contentBase: `http://localhost:${PORT}`,
		hot: true,
		lazy: false,
		stats: 'minimal',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	
	}))

	/**
	 * Webpack hot middleware
	 */
	
	.use(require('webpack-hot-middleware')(compiler, {
		log: console.log
	}))

	/**
	 * Remove trailing slashes.
	 */

	.use((req, res, next) => {
		if (req.path.length > 1 && /\/$/.test(req.path)) {
			const query = req.url.slice(req.path.length);
			res.redirect(301, req.path.slice(0, -1) + query);
		} else {
			return next();
		}
		return false;
	})

	/**
	 * To make history working:
	 * https://github.com/ampedandwired/html-webpack-plugin/issues/145#issuecomment-170554832
	 */

	.use('*', (req, res, next) => {

		const filename = path.join(compiler.outputPath, 'index.html');

		compiler.outputFileSystem.readFile(filename, (err, result) => {
			if (err) {
				return next(err);
			}
			res.set('content-type', 'text/html');
			res.send(result);
			res.end();
			return false;
		});

	})

	.listen(PORT, (err) => {
		if (err) {
			throw err;
		}
		console.info(`==> 🚧  Webpack development server listening on port ${PORT}`);
	});