import React from 'react';
import styles from './Box.scss';
import _ from 'lodash/string';

export default (props) => (

	<div className={styles.wrapper}>
		
		<div className={styles.header}>

			{ _.capitalize(props.header) }
		
		</div>

		<div className={styles.content}>
			
			{ props.children }

		</div>
	
	</div>

);