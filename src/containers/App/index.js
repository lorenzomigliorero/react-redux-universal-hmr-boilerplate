import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import _ from 'lodash/string';

import Routes from '@/router';
import pkg from '../../../package.json';

import { Grid, Row, Col } from '@/components/Grid/';

import PlayersListContainer from '@/containers/PlayersList';

export default (props) => {
	
	return (
		
		<Grid>

			<Helmet

				meta={[
					{
						charset: 'utf-8'
					},
					{
						name: 'viewport',
						content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
					},
					{
						'http-equiv': 'X-UA-Compatible',
						content: 'IE=edge, chrome=1'
					},
					{
						name: 'description',
						content: 'Lorem ipsum'
					}
				]}

			/>

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