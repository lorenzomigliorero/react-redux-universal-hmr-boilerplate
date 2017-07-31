import { RECEIVE_IMAGES } from './constants';

const initialState = {

	all: []
	
};

export default (state = initialState, action) => {

	if (typeof action === 'undefined') {
		return state;
	}

	switch (action.type) {

	case RECEIVE_IMAGES: {

		return {
			...state,
			all: action.payload.data
		};

	}

	default:
		return state;
	}

};