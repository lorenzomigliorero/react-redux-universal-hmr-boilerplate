import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash/string';

import Routes from 'views/routes';
import pkg from '../../../package.json';

import Box from 'components/Box';
import Media from 'components/Media';
import Image from 'components/Image';

import SvgInline from 'components/SvgInline';
import { Grid, Row, Col } from 'components/Grid/';

import PlayersListContainer from 'containers/PlayersListContainer';

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

						<h3>Static assets loaders example:</h3>
						
						<Row>

							<Col sm={4} md>
								<Box header='png'>
									<Image src='react.png' />
								</Box>
							</Col>
							<Col sm={4} md>
								<Box header='svg'>
									<Image src='redux.svg' />
								</Box>
							</Col>
							<Col sm={4} md>
								<Box header='svg inline'>
									<SvgInline src='tiger.svg' />
								</Box>
							</Col>
							<Col sm={4} md>
								<Box header='jpg'>
									<Image src='webpack.jpg' />
								</Box>
							</Col>
							<Col sm={4} md>
								<Box header='mp4'>
									<Media src='SampleVideo_360x240_1mb.mp4' />
								</Box>
							</Col>
						
						</Row>
				
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