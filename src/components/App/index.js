import React from 'react';

import { Link } from 'react-router-dom';
import Routes from '../../views/routes';
import Image from '../Image';

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
			<Image src='react.png'></Image>
			<Image src='tiger.svg'></Image>
			<Image src='redux.svg' inline={true}></Image>
			<Image src='webpack.jpg'></Image>
			<Routes></Routes>
		</main>

		<footer>Footer</footer>
	
	</div>

);