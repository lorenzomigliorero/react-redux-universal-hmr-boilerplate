import { RECEIVE_IMAGES, REQUEST_IMAGES } from './constants';

const test = [
	{
		header: 'png',
		type: 'image',
		src: 'react.png'
	},
	{
		header: 'svg',
		type: 'image',
		src: 'redux.svg'
	},
	{
		header: 'svg inline',
		type: 'svginline',
		src: 'tiger.svg'
	},
	{
		header: 'jpg',
		type: 'image',
		src: 'webpack.jpg'
	},
	{
		header: 'mp4',
		type: 'media',
		src: 'SampleVideo_360x240_1mb.mp4'
	}
];

const requestImages = () => ({

	type: REQUEST_IMAGES

});

const receiveImages = (data) => ({

	type: RECEIVE_IMAGES,
	payload: {
		data
	}

});

const fetchImages = () => dispatch => {

	dispatch(requestImages());

	return new Promise(resolve => {
	
		setTimeout(() => {

			resolve(test);
		
		}, 500);

	}).then(response => {

		dispatch(receiveImages(response));

	});

};

export default {

	fetchImages

};