import React, { ReactNode } from 'react';
import styles from '@components/app/app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';

export const HomePage = (): ReactNode => {
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
