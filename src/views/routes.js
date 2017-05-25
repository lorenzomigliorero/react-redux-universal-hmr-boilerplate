import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import About from './About';
import NotFound from './NotFound';

export default () => (

	<Switch>
		<Route exact path='/' component={Home}></Route>
		<Route exact path='/about' component={About}></Route>
		<Route component={NotFound}></Route>
	</Switch>
	
);