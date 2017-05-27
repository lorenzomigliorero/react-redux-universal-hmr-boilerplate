import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter as Router } from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';
import compression from 'compression';
import routes from './views/routes';

const PORT = process.env.PORT;

new Express()
	
	/**
	 * Enable GZIP compression for HTML response and static files
	 */

	.use(compression({ threshold: 0 }))

	/**
	 * Enable long term caching for CSS and JS files!
	 */

	.use((req, res, next) => {

		let contentType = req.headers['content-type'];

		if (
			contentType.includes('application/javascript')
			|| contentType.includes('application/javascript')
		) {
			
			res.setHeader('Cache-Control', 'public, max-age=31557600');

		};

		next();

	})

	/**
	 * Set express to serve static folder from public
	 */

	.use(Express.static(path.resolve(__dirname, 'public')))

	/**
	 * Enable SSR
	 */

	.get('*', (req, res) => {

		/**
		 * If route not match with app routes, set 404 as status
		 */
	
		let route = routes().props.children
			
			.map(i => ({
				path: i.props.path,
				exact: i.props.exact,
				strict: false
			}))
			
			.filter(i => i.path)
			
			.find(i => matchPath(req.url, i));

		const context = {
			is404: !route
		};

		/**
		 * Generate markup string with renderToString method
		 */

		const App = require('./components/App').default;
		const reducers = require('./reducers/').default;
		const store = createStore(reducers);

		var markup = renderToString(

			<Provider store={store}>
				<Router location={req.url} context={context}>
					<App />
				</Router>
			</Provider>
		
		);

		/**
		 * Set properly status code
		 */

		let status = context.is404 ? 404 : 200;

		/**
		 * context.url will contain the URL to redirect to if a <Redirect> was used
		 */

		if (context.url) {
			return res.redirect(302, context.url);
		}

		/**
		 * Generate HTML index page and inject markup string
		 */

		const template = require('./views/index.ejs');
		const manifest = require('../dist/manifest.json');
		const manifestFileContents =  fs.readFileSync(path.resolve(__dirname, 'dist', manifest['../manifest.js']), 'utf8');
		
		return res.status(status).send(

			minify(

				template({
				
					title: 'My first React App',
					markup,
					manifest,
					manifestFileContents

				}), {
					
					collapseWhitespace: true,
					minifyJS: true
				
				}

			)

		);

	})

	/**
	 * Start server
	 */

	.listen(PORT, () => {

		console.info(`==> 🚧  Webpack development server listening on port ${PORT}`);

	});