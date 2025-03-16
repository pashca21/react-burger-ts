import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';

export const App = () => {
	return (
		<div style={{ height: '100vh' }}>
			<AppHeader />
			<main style={{ display: 'flex', maxWidth: '1280px', margin: '0 auto' }}>
				<section style={{ flex: 1 }}>
					<BurgerIngredients />
				</section>
				<section style={{ flex: 1 }}>
					<BurgerConstructor />
				</section>
			</main>
		</div>
	);
};
