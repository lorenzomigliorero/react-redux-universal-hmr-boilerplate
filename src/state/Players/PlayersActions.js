const addPlayer = () => ({
	type: 'ADD_PLAYER',
	data: {
		name: 'Test'
	}
});

const removePlayer = (p) => ({
	type: 'REMOVE_PLAYER',
	data: {
		player: p
	}
});

export default {

	addPlayer,
	removePlayer

};