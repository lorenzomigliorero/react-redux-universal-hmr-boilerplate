import {
	ADD_LIST_ITEM,
	REMOVE_LIST_ITEM
} from './constants';

const addListItem = () => ({
	type: ADD_LIST_ITEM,
	data: {
		name: 'Test'
	}
});

const removeListItem = (p) => ({
	type: REMOVE_LIST_ITEM,
	data: {
		item: p
	}
});

export default {

	addListItem,
	removeListItem

};