import { useEffect, useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredient } from '@components/burger-ingredients/burger-ingredient';
import { IngredientProps } from '@utils/types';
import styles from './burger-ingredients.module.css';
import { useAppSelector } from '../../hooks/useAppSelector';

export const BurgerIngredients = () => {
	const IngredientTypeBun = 'bun';
	const IngredientTypeMain = 'main';
	const IngredientTypeSauce = 'sauce';

	const [currentTab, setCurrentTab] = useState(IngredientTypeBun);

	const ingredients = useAppSelector(
		(state: any) => state.ingredients.ingredients
	);

	const bunRef = useRef<HTMLDivElement>(null);
	const sauceRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

	const handleTabClick = (tab: string) => {
		setCurrentTab(tab);
		if (tab === IngredientTypeBun) {
			bunRef.current?.scrollIntoView({ behavior: 'smooth' });
		} else if (tab === IngredientTypeSauce) {
			sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
		} else if (tab === IngredientTypeMain) {
			mainRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			const bunOffset = bunRef.current?.getBoundingClientRect().top || 0;
			const sauceOffset = sauceRef.current?.getBoundingClientRect().top || 0;
			const mainOffset = mainRef.current?.getBoundingClientRect().top || 0;

			if (bunOffset < 100 && sauceOffset >= 100) {
				setCurrentTab(IngredientTypeBun);
			} else if (sauceOffset < 100 && mainOffset >= 100) {
				setCurrentTab(IngredientTypeSauce);
			} else if (mainOffset < 100) {
				setCurrentTab(IngredientTypeMain);
			}
		};

		const scrollContainer = document.querySelector(`.${styles.scroll_section}`);
		scrollContainer?.addEventListener('scroll', handleScroll);

		return () => {
			scrollContainer?.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const renderIngredients = (type: string) => {
		return ingredients
			.filter((ingredient: { type: string }) => ingredient.type === type)
			.map((ingredient: IngredientProps) => (
				<BurgerIngredient key={ingredient._id} ingredient={ingredient} />
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
				<div ref={bunRef} className={styles.section}>
					{renderIngredients(IngredientTypeBun)}
				</div>
				<p className='text text_type_main-medium pt-10'>Соусы</p>
				<div ref={sauceRef} className={styles.section}>
					{renderIngredients(IngredientTypeSauce)}
				</div>
				<p className='text text_type_main-medium pt-10'>Начинки</p>
				<div ref={mainRef} className={styles.section}>
					{renderIngredients(IngredientTypeMain)}
				</div>
			</div>
		</div>
	);
};
