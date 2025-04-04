import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import styles from './app.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from '@services/actions/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch<any>(getIngredients());
	}, [dispatch]);

	return (
		<div className={styles.index}>
			<AppHeader />
			<DndProvider backend={HTML5Backend}>
				<main className={styles.main}>
					<section className={styles.section}>
						<BurgerIngredients />
					</section>
					<section className={styles.section}>
						<BurgerConstructor />
					</section>
				</main>
			</DndProvider>
		</div>
	);
};
