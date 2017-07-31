import React from 'react';
import { render } from 'react-dom';

import {
	createStore,
	compose,
	applyMiddleware
} from 'redux';

import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '@/reducers';

const Router = require('react-router-dom')[process.env.STATIC ? 'HashRouter' : 'BrowserRouter'];

/* eslint-disable no-underscore-dangle */
const initialState = window.__REDUX_STATE__;

const composeElements = [
	applyMiddleware(thunkMiddleware)
];

if (
	process.env.NODE_ENV === 'development'
	&& window.__REDUX_DEVTOOLS_EXTENSION__
) {
	composeElements.push(window.__REDUX_DEVTOOLS_EXTENSION__());
};

const store = createStore(reducers, initialState, compose(
	...composeElements	
));
/* eslint-enable no-underscore-dangle */

/**
 * Require main styles
 */

require('@/styles');

/**
 * Render App component
 */

const renderComponent = () => {

	const App = require('@/containers/App');

	return (

		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>

	);
	
};

/**
 * Render App on first client render
 */
render(renderComponent(), document.getElementById('root'));

/**
 * Enable HMR on App and Reducers
 */

if (module.hot) {
	
	module.hot.accept('@/containers/App', () => render(renderComponent(), document.getElementById('root')));
	module.hot.accept('@/reducers', () => store.replaceReducer(require('@/reducers')));

};