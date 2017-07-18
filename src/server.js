import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter as Router } from 'react-router-dom';
import Helmet from 'react-helmet';
import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';
import compression from 'compression';

import App from '@/containers/App';
import reducers from '@/reducers';
import template from '@/index.ejs';
import routes from '@/router/routes';
import manifest from '../dist/manifest.json';

const PORT = process.env.PORT || 3000;

new Express()
	
	/**
	 * Enable GZIP compression for HTML response and static files
	 */

	.use(compression({ threshold: 0 }))

	/**
	 * Enable long term caching
	 */

	.use((req, res, next) => {

		res.setHeader('Cache-Control', 'public, max-age=31557600');
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
		 * Create empty Redux initial state
		 */
	
		
		const initialState = {};

		const store = createStore(reducers, initialState, compose(
			applyMiddleware(thunkMiddleware)
		));
		
		/**
		 * Create promises array, using loadData function of every matched route
		 */

		const promises = [];

		routes.some(route => {

			const match = matchPath(req.url, route);

			if (
				match
				&& route.loadData
			) {

				promises.push(route.loadData(match, store.dispatch));

			}

			return match;

		});

		/**
		 * When all data are fetched and Redux Store are populated,
		 * create render to string method
		 */

		Promise.all(promises).then(data => {

			const route = routes.find(i => matchPath(req.url, i));

			const context = {
				status: route.path ? 200 : route.to ? 302 : 404
			};

			/**
			 * Generate markup string with renderToString method
			 */

			const markup = renderToString(

				<Provider store={store}>
					<Router location={req.url} context={context}>
						<App />
					</Router>
				</Provider>
			
			);

			/**
			 * If status is 302, redirect to new url
			 */

			if (context.status === 302) {
				return res.redirect(302, context.url);
			}

			/**
			 * Generate HTML index page and inject markup string
			 */

			const manifestFileContents = fs.readFileSync(path.resolve(__dirname, 'dist', manifest['../manifest.js']), 'utf8');
			
			return res.status(context.status).send(

				minify(

					template({
					
						helmet: Helmet.rewind(),
						state: store.getState(),	
						markup,
						manifest,
						manifestFileContents

					}), {
						
						collapseWhitespace: true,
						minifyJS: true
					
					}

				)

			);

		});

	})

	/**
	 * Start server
	 */

	.listen(PORT, () => {

		console.info(`==> 🚧  Webpack development server listening on port ${PORT}`);

	});