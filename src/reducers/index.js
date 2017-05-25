import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import Players from '../state/Players/';

let reducers = {};

// require
// 	.context('../state', true, /index.js/)
// 	.keys()
// 	.forEach(i => {
		
// 		let state = require(`../state/${i.replace('./', '')}`).default;
// 		reducers[state.constants.NAME] = state.reducer;

// 	});

export default combineReducers(Object.assign(reducers, {
	players: Players.reducer,
	routing: routeReducer
}));