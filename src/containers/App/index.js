import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash/string';

import Routes from '../../router';
import pkg from '../../../package.json';

import { Grid, Row, Col } from 'components/Grid/';

import PlayersListContainer from 'containers/PlayersList';

/**
 * Require main styles
 */

require('./App.scss');

export default (props) => {
	
	return (
		
		<Grid>

			<h1>
				{ _.startCase(pkg.name) }
			</h1>
		
			<header>

				<h3>React Router { pkg.dependencies['react-router-dom'] } navigation example</h3>

				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/about'>About</Link>
						</li>
					</ul>
				</nav>
			</header>

			<main>
			
				<Row>
				
					<Col md={8}>
						
						<Routes />
				
					</Col>
				
					<Col md={4}>
						<h3>Redux example:</h3>
						<PlayersListContainer />
					</Col>
			
				</Row>

			</main>
		
		</Grid>

	);

};