import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';

export default () => (

	<Switch>
		{
			routes.map((route, i) => (
				<Route {...route} key={i} />
			))
		}
	</Switch>
	
);	