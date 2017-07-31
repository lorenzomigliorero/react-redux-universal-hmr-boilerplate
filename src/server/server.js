import path from 'path';
import fs from 'fs';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter as Router } from 'react-router-dom';
import Helmet from 'react-helmet';
import Express from 'express';
import compression from 'compression';

import App from '@/containers/App';
import reducers from '@/reducers';
import template from '@/index.ejs';
import routes from '@/router/routes';
import { PUBLIC_PATH } from '@/constants';

let manifest = '';
let manifestFileContents = '';

const PORT = process.env.PORT || 3000;

const app = Express();

if (process.env.NODE_ENV === 'production') {

	manifest = require('../../dist/manifest.json');
	manifestFileContents = fs.readFileSync(path.resolve(__dirname, manifest['manifest.js']), 'utf8');
	
	app
	
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
		 * Set public as public asset folder for Express
		 */

		.use(Express.static(path.resolve(__dirname, 'public')));


};

app.get('*', (req, res) => {

	console.log(req.url);

	/**
	 * Create empty Redux initial state
	 */
	
	const initialState = {};

	const store = createStore(reducers, initialState, compose(
		applyMiddleware(thunkMiddleware)
	));

	const promises = [];

	routes.some(route => {

		const match = matchPath(req.url, route);

		if (
			match
			&& route.fetchData
		) {

			promises.push(route.fetchData(match, store.dispatch));

		}

		return match;

	});

	/**
	 * Fetch data and populate Redux Store before rendering
	 */

	Promise.all(promises).then(data => {

		const route = routes.find(i => matchPath(req.url, i));

		const context = {
			status: route.path ? 200 : route.to ? 302 : 404
		};

		/**
		 * Call renderToString method
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

		const ejsParams = {
			
			helmet: Helmet.rewind(),
			state: store.getState(),	
			markup,
			env: process.env.NODE_ENV,
			publicFolder: PUBLIC_PATH

		};

		if (process.env.NODE_ENV === 'production') {
		
			ejsParams.manifest = manifest;
			ejsParams.manifestFileContents = manifestFileContents;

		};

		return res.status(context.status).send(

			template(ejsParams)

		);

	});

});

if (process.env.NODE_ENV === 'production') {

	app.listen(PORT, () => {
		
		console.info(`👍  Express server run on port ${PORT}`);
	
	});

}

export default app;