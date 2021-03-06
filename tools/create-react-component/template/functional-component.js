module.exports = (params) => `

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './${params.name}.scss';

export default class ${params.name} extends Component {

	constructor(props) {
		
		super(props);
		this.props = props;
		
	}

	render() {

		return (

			<div>
				<h2>${params.name}</h2>
				<h3>Functional Component</h3>
				<p className={styles.test}>{this.props.test}</p>
			</div>

		);
	}
};

Image.propTypes = {

	test: PropTypes.string.isRequired

};`.trim();