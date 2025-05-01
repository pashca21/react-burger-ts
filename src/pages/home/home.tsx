import React from 'react';
import styles from '@components/app/app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';

export const HomePage = (): JSX.Element => {
	return (
		<>
			<section className={styles.section}>
				<BurgerIngredients />
			</section>
			<section className={styles.section}>
				<BurgerConstructor />
			</section>
		</>
	);
};
