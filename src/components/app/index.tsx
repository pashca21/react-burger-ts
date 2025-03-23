import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import styles from './app.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
	const API_URl = 'https://norma.nomoreparties.space/api/ingredients';
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(API_URl)
			.then((res) => res.json())
			.then((data) => {
				setData(data.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className={styles.index}>
			<AppHeader />
			<main className={styles.main}>
				<section className={styles.section}>
					<BurgerIngredients data={data} />
				</section>
				<section className={styles.section}>
					<BurgerConstructor data={data} />
				</section>
			</main>
		</div>
	);
};
