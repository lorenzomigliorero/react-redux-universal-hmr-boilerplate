import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../../views/routes';
import _ from 'lodash/string';
import pkg from '../../../package.json';

import Box from '../Box';
import Media from '../Media';
import Image from '../Image';

import PlayersListContainer from '../../containers/PlayersListContainer';

/**
 * Require main styles
 */

require('./App.scss');

export default (props) => (
	
	<div>

		<h1>
			{ _.startCase(pkg.name) }
		</h1>
		
		<header>
		
			<h3>React Router { pkg.dependencies['react-router-dom'] } navigation example</h3>

			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
				</ul>
			</nav>
		</header>
		
		<main>
		
			<Routes></Routes>

			<div>
				<h3>Static assets loaders example:</h3>
				
				<Box header='png'>
					<Image src='react.png' />
				</Box>
				<Box header='svg'>
					<Image src='tiger.svg' />
				</Box>
				<Box header='svg inline'>
					<Image src='redux.svg' inline={true} />
				</Box>
				<Box header='jpg'>
					<Image src='webpack.jpg' />
				</Box>
				<Box header='mp4'>
					<Media src='SampleVideo_360x240_1mb.mp4' />
				</Box>
			</div>
		
			<div>
				<h3>Redux example:</h3>
				<PlayersListContainer></PlayersListContainer>
			</div>

		</main>

	</div>

);