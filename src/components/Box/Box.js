import React from 'react';
import _ from 'lodash/string';
import styles from './Box.scss';

export default (props) => {
	
	return (

		<div className={styles.wrapper}>
			
			<div>

				{ _.capitalize(props.header) }
			
			</div>

			<div className={styles.content}>
				
				{ props.children }

			</div>
		
		</div>

	);

};