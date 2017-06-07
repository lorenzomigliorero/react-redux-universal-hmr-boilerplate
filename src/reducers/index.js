import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';
import { reducer as players } from 'state/Players/';

export default combineReducers({
	players,
	routing
});