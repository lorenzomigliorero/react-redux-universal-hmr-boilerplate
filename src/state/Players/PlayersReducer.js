const initialState = [
	{

		name: 'Player1',
		id: 1

	},
	{

		name: 'Player2',
		id: 2

	}
];

export default (state = initialState, action) => {

	if (typeof action === 'undefined') {
		return state;
	}

	let newState = state.slice(0);
	
	switch (action.type) {

	case 'ADD_PLAYER': {
		
		let id = newState.length + 1;
		newState.push(
			{
				name : 'new player' + id,
				id : id
			}
		);
		return newState;
		break;
	}

	case 'REMOVE_PLAYER': {

		return newState.filter(i => i.id !== action.data.player.id);
		break;

	}

	default:
		return newState;
		break;
	}

};