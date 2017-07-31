const CONSTANTS = {

	PUBLIC_PATH: '/'

};

if (process.env.NODE_ENV === 'development') {

	CONSTANTS.PUBLIC_PATH = 'http://localhost:3001/';

} else if (process.env.STATIC) {

	CONSTANTS.PUBLIC_PATH = '';

};

export default CONSTANTS;