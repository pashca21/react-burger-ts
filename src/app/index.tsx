import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import styles from './app.module.css';

export const App = () => {
	return (
		<div className={styles.index}>
			<AppHeader />
			<main className={styles.main}>
				<section className={styles.section}>
					<BurgerIngredients />
				</section>
				<section className={styles.section}>
					<BurgerConstructor />
				</section>
			</main>
		</div>
	);
};
