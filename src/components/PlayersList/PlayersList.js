import React, { Component } from 'react';

export default class PlayerList extends Component {
	
	constructor(props) {

		super(props);

	}

	render() {
		return (
			<ul>

				{
					this.props.players.map((i, index) => (

						<li key={index}>
							{i.name}
							<button onClick={() => this.props.removePlayer(i)}>Remove player {i.name}</button>
						</li>

					))
				}

				<button onClick={this.props.addPlayer}>ADD PLAYER</button>

			</ul>
		);
	}
}