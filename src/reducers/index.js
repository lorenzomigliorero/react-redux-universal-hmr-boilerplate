import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';
import { reducer as players } from 'state/Players/';

// require
// 	.context('../state', true, /index.js/)
// 	.keys()
// 	.forEach(i => {
		
// 		let state = require(`../state/${i.replace('./', '')}`);
// 		reducers[state.constants.NAME] = state.reducer;

// 	});

export default combineReducers({
	players,
	routing
});