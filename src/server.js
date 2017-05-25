import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter as Router } from 'react-router-dom';
import ejs from 'ejs';
import routes from './views/routes';
import path from 'path';

var app;
const PORT = process.env.PORT;

/**
 * If NODE_ENV is on development, launch dev server with HMR,
 * else create a new Express instance
 */

if (process.env.NODE_ENV === 'development') {

	app = require('../tools/webpack-dev-server').default;

} else {

	app = new Express();

};

app
	
	.use(Express.static(path.resolve(__dirname, 'public')))
	
	.get('*', (req, res) => {
	
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

		var markup = '';
		
		if (process.env.UNIVERSAL) {

			const App = require('./views/App').default;
			const reducers = require('./reducers/').default;
			const store = createStore(reducers);

			markup = renderToString(

				<Provider store={store}>
					<Router location={req.url} context={context}>
						<App />
					</Router>
				</Provider>
			
			);

		};

		let status = 200;

		/**
		 * context.url will contain the URL to redirect to if a <Redirect> was used
		 */

		if (context.url) {
			return res.redirect(302, context.url);
		}

		if (context.is404) {
			status = 404;
		}

		var template = ejs.compile(require('./views/index').default);

		return res.status(status).send(template({
			title: 'My first React App',
			markup
		}));

	})

	.listen(PORT, () => {

		console.info(`==> 🚧  Webpack development server listening on port ${PORT}`);

	});