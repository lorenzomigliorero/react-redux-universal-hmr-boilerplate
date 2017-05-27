import React, { Component } from 'react';

export default class Media extends Component {

	constructor(props) {

		super(props);
		this.props = props;

	}

	get media() {

		let source = require(`../../assets/media/${this.props.src}`);
		return <video src={source} />;

	}

	render() {
		
		return (

			this.media
			
		);
	
	}

};