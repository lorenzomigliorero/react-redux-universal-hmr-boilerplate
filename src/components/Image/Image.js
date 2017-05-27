import React, { Component } from 'react';
import SVGInline from 'react-svg-inline';
import PropTypes from 'prop-types';

export default class Image extends Component {

	constructor(props) {
		
		super(props);
		this.props = props;
		
	}

	get image() {
	
		if (this.props.inline) {
			
			let source = require(`!!raw-loader!../../assets/images/${this.props.src}`);
			return <SVGInline svg={source} />;

		} else {

			let source = require(`../../assets/images/${this.props.src}`);
			return <img src={source} />;

		};


	}

	render() {

		return (

			this.image

		);
	}
};

Image.propTypes = {

	inline: PropTypes.bool,
	src: PropTypes.string
	
};