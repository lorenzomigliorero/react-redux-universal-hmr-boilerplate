import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

const Router = require('react-router-dom')[process.env.STATIC ? 'HashRouter' : 'BrowserRouter'];
const store = createStore(reducer);

const renderComponent = () => {

	const App = require('./components/App').default;

	return (

		<Provider store={store}>
			<Router>
				<App></App>
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
	
	module.hot.accept('./components/App', () => render(renderComponent(), document.getElementById('root')));
	module.hot.accept('./reducers', () => store.replaceReducer(require('./reducers').default));

};