import { combineReducers } from 'redux';
import { reducer as images } from '@/state/Images/';
import { reducer as list } from '@/state/List/';

export default combineReducers({
	images,
	list
});