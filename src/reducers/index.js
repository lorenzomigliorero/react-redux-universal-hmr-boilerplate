import { combineReducers } from 'redux';
import { reducer as images } from 'state/Images/';
import { reducer as players } from 'state/Players/';

export default combineReducers({
	images,
	players
});