import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import _ from 'lodash/string';

import Routes from '@/router';
import { Grid, Row, Col } from '@/components/Grid/';
import ListContainer from '@/containers/List';
import pkg from '../../../../package.json';

export default (props) => {
	
	return (
		
		<Grid>

			<Helmet

				meta={[
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
						<h3>Basic Redux implementation:</h3>
						<ListContainer />
					</Col>
			
				</Row>

			</main>
		
		</Grid>

	);

};