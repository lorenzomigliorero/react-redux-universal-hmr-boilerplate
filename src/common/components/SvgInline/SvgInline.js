import React, { Component } from 'react';
import SVGInline from 'react-svg-inline';
import PropTypes from 'prop-types';

export default class Image extends Component {

	constructor(props) {
		
		super(props);
		this.props = props;
		
	}

	get image() {
	
		return require(`@/assets/svg-inline/${this.props.src}`);

	}

	render() {

		return (

			<SVGInline svg={this.image} />

		);
	}
};

Image.propTypes = {

	src: PropTypes.string.isRequired
	
};