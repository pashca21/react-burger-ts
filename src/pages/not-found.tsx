import React from 'react';
import styles from './not-found.module.css';

export const NotFoundPage = () => {
	return (
		<div className={`${styles.not_found_container}`}>
			<div className={`${styles.not_found_texts}`}>
				<p className='text text_type_digits-large'>404</p>
				<p className='text text_type_main-medium'>Упс, такой страницы нет</p>
			</div>
		</div>
	);
};
