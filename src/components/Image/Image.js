import React, { Component } from 'react';
import path from 'path';
import styles from './Image.scss';
import _ from 'lodash/string';
import SVGInline from 'react-svg-inline';

export default class Image extends Component {

	constructor(props) {
		super(props);

		if (this.props.inline) {

			this.image = require(`!raw-loader!../../assets/${props.src}`);

		} else {

			this.image = require(`../../assets/${props.src}`);

		};
		
		this.extension = path.extname(props.src).replace('.', '');

	}

	render() {
		
		return (

			<div
				className={styles.wrapper}
			>
				<div className={styles.header}>

					{ _.capitalize(this.extension) } { this.props.inline ? 'inline' : '' }
				
				</div>

				<div className={styles.content}>
					
					{
						this.props.inline ? (

							<SVGInline svg={this.image} />

						) : <img src={this.image} />
					}

				</div>
			
			</div>

		);
	}
}