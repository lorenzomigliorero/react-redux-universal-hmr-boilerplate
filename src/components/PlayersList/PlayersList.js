import React from 'react';
import styles from './PlayersList.scss';

export default (props) => {
	
	return (
		<div className={styles.wrapper}>
			<ul className={styles.list}>
			
				{
					props.players.map((i, index) => (
			
						<li
							key={index}
							className={`${styles.item} ${index % 2 === 0 ? styles.odd : ''}`}
						>
							<span className={styles.label}>{i.name}</span>
							<button
								onClick={() => props.removePlayer(i)}
								className={styles.button}
							>Remove player {i.name}</button>
						</li>
			
					))
				}
			
			</ul>
			
			<button onClick={props.addPlayer} className={`${styles.button} ${styles.add}`}>ADD PLAYER</button>

		</div>
	);

};