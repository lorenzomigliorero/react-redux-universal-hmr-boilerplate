import React from 'react';
import styles from './List.scss';

export default (props) => {
	
	return (
		<div className={styles.wrapper}>
			<ul className={styles.list}>
			
				{
					props.list.map((i, index) => (
			
						<li
							key={index}
							className={`${styles.item} ${index % 2 === 0 ? styles.odd : ''}`}
						>
							<span className={styles.label}>{i.name}</span>
							<button
								onClick={() => props.removeListItem(i)}
								className={styles.button}
							>Remove</button>
						</li>
			
					))
				}
			
			</ul>
			
			<button
				onClick={props.addListItem}
				className={`${styles.button} ${styles.add}`}
			>ADD LIST ITEM</button>

		</div>
	);

};