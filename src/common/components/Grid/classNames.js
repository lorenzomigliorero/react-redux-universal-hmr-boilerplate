import styles from './Grid.scss';

export default function getClass(className) {
	return (styles && styles[className]) ? styles[className] : className;
};