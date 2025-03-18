import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredient } from '@components/burger-ingredients/burger-ingredient';
import data from '@utils/data';
import { Ingredient } from '@utils/types';
import styles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
	const IngredientTypeBun = 'bun';
	const IngredientTypeMain = 'main';
	const IngredientTypeSauce = 'sauce';

	const [currentTab, setCurrentTab] = useState(IngredientTypeBun);

	const handleTabClick = (tab: string) => {
		setCurrentTab(tab);
	};

	const renderIngredients = (type: string) => {
		return data
			.filter((ingredient: { type: string }) => ingredient.type === type)
			.map((ingredient: Ingredient) => (
				<BurgerIngredient
					key={ingredient._id}
					name={ingredient.name}
					type={ingredient.type}
					image={ingredient.image}
					price={ingredient.price}
				/>
			));
	};

	return (
		<div>
			<p className='text text_type_main-large'>Соберите бургер</p>
			<div className={styles.header}>
				<Tab
					value={IngredientTypeBun}
					active={currentTab === IngredientTypeBun}
					onClick={() => handleTabClick(IngredientTypeBun)}>
					Булки
				</Tab>
				<Tab
					value={IngredientTypeSauce}
					active={currentTab === IngredientTypeSauce}
					onClick={() => handleTabClick(IngredientTypeSauce)}>
					Соусы
				</Tab>
				<Tab
					value={IngredientTypeMain}
					active={currentTab === IngredientTypeMain}
					onClick={() => handleTabClick(IngredientTypeMain)}>
					Начинки
				</Tab>
			</div>
			<div className={styles.scroll_section}>
				<p className='text text_type_main-medium pt-10'>Булки</p>
				<div className={styles.section}>
					{renderIngredients(IngredientTypeBun)}
				</div>
				<p className='text text_type_main-medium pt-10'>Соусы</p>
				<div className={styles.section}>
					{renderIngredients(IngredientTypeSauce)}
				</div>
				<p className='text text_type_main-medium pt-10'>Начинки</p>
				<div className={styles.section}>
					{renderIngredients(IngredientTypeMain)}
				</div>
			</div>
		</div>
	);
};
