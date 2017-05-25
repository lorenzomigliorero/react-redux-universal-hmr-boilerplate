import React, { Component } from 'react';
import PlayersListContainer from '../../containers/PlayersListContainer';

export default class Home extends Component {
	render() {
		return (
			<div>
				<h1>Home</h1>
				<PlayersListContainer></PlayersListContainer>
			</div>
		);
	}
}