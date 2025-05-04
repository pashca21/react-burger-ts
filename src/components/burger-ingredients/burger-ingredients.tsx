import { useEffect, useState, useRef, ReactNode } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { BurgerIngredient } from '@components/burger-ingredients/burger-ingredient';
import { IIngredient } from '@interfaces/index';
import { useAppSelector } from '@hooks/index';

export const BurgerIngredients = (): ReactNode => {
	enum IngredientType {
		Bun = 'bun',
		Main = 'main',
		Sauce = 'sauce',
	}

	const [currentTab, setCurrentTab] = useState<IngredientType>(
		IngredientType.Bun
	);

	const ingredients: IIngredient[] = useAppSelector(
		(state: any) => state.ingredients.ingredients
	);

	const bunRef = useRef<HTMLDivElement>(null);
	const sauceRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

	const handleTabClick = (tab: IngredientType): void => {
		setCurrentTab(tab);
		if (tab === IngredientType.Bun) {
			bunRef.current?.scrollIntoView({ behavior: 'smooth' });
		} else if (tab === IngredientType.Sauce) {
			sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
		} else if (tab === IngredientType.Main) {
			mainRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		const handleScroll = (): void => {
			const bunOffset: number =
				bunRef.current?.getBoundingClientRect().top || 0;
			const sauceOffset: number =
				sauceRef.current?.getBoundingClientRect().top || 0;
			const mainOffset: number =
				mainRef.current?.getBoundingClientRect().top || 0;

			if (bunOffset < 100 && sauceOffset >= 100) {
				setCurrentTab(IngredientType.Bun);
			} else if (sauceOffset < 100 && mainOffset >= 100) {
				setCurrentTab(IngredientType.Sauce);
			} else if (mainOffset < 100) {
				setCurrentTab(IngredientType.Main);
			}
		};

		const scrollContainer: Element | null = document.querySelector(
			`.${styles.scroll_section}`
		);
		scrollContainer?.addEventListener('scroll', handleScroll);

		return () => {
			scrollContainer?.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const renderIngredients = (type: string) => {
		return ingredients
			.filter((ingredient: { type: string }) => ingredient.type === type)
			.map((ingredient: IIngredient) => (
				<BurgerIngredient key={ingredient._id} ingredient={ingredient} />
			));
	};

	return (
		<div>
			<p className='text text_type_main-large'>Соберите бургер</p>
			<div className={styles.header}>
				<Tab
					value={IngredientType.Bun}
					active={currentTab === IngredientType.Bun}
					onClick={() => handleTabClick(IngredientType.Bun)}>
					Булки
				</Tab>
				<Tab
					value={IngredientType.Sauce}
					active={currentTab === IngredientType.Sauce}
					onClick={() => handleTabClick(IngredientType.Sauce)}>
					Соусы
				</Tab>
				<Tab
					value={IngredientType.Main}
					active={currentTab === IngredientType.Main}
					onClick={() => handleTabClick(IngredientType.Main)}>
					Начинки
				</Tab>
			</div>
			<div className={styles.scroll_section}>
				<p className='text text_type_main-medium pt-10'>Булки</p>
				<div ref={bunRef} className={styles.section}>
					{renderIngredients(IngredientType.Bun)}
				</div>
				<p className='text text_type_main-medium pt-10'>Соусы</p>
				<div ref={sauceRef} className={styles.section}>
					{renderIngredients(IngredientType.Sauce)}
				</div>
				<p className='text text_type_main-medium pt-10'>Начинки</p>
				<div ref={mainRef} className={styles.section}>
					{renderIngredients(IngredientType.Main)}
				</div>
			</div>
		</div>
	);
};
