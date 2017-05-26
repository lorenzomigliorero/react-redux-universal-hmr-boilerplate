import React from 'react';

import { Link } from 'react-router-dom';
import Routes from '../../views/routes';

// require('../../styles/main');

require('../../constant');

export default (props) => (
	
	<div>
		
		<header>
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
		</main>

		<footer>Footer</footer>
	
	</div>

);