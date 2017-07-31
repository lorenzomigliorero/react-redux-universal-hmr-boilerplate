import {
	ADD_LIST_ITEM,
	REMOVE_LIST_ITEM
} from './constants';

const initialState = [
	{

		name: 'List Item 1',
		id: 1

	},
	{

		name: 'List Item 2',
		id: 2

	}
];

export default (state = initialState, action) => {

	if (typeof action === 'undefined') {
		return state;
	}

	const newState = state.slice(0);
	
	switch (action.type) {

	case ADD_LIST_ITEM: {
		
		const id = newState.length + 1;
		newState.push(
			{
				name: `List Item ${id}`,
				id
			}
		);
		return newState;
	}

	case REMOVE_LIST_ITEM: {

		return newState.filter(i => i.id !== action.data.item.id);

	}

	default:
		return newState;
	}

};