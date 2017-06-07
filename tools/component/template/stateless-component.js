export default (params) => `

import React from 'react';
import styles from './${params.name}.scss';

export default (props) => {
	
	return (
		<div>
			<h2>${params.name}</h2>
			<h3>Stateless Component</h3>
			<p className={styles.test}>{props.test}</p>
		</div>
	);

};

`.trim();