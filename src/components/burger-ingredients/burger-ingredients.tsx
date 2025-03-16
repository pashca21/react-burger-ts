import { Key, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredient } from '@components/burger-ingredients/burger-ingredient';
import data from '@utils/data';

export const BurgerIngredients = () => {
	const [currentTab, setCurrentTab] = useState('bun');

	const handleTabClick = (tab: string) => {
		setCurrentTab(tab);
	};

	const renderIngredients = (type: string) => {
		return data
			.filter((ingredient: { type: string }) => ingredient.type === type)
			.map(
				(ingredient: {
					_id: Key | null | undefined;
					name: string;
					type: string;
					image: string | undefined;
					price: number;
				}) => (
					<BurgerIngredient
						key={ingredient._id}
						name={ingredient.name}
						type={ingredient.type}
						image={ingredient.image}
						price={ingredient.price}
					/>
				)
			);
	};

	return (
		<div>
			<p className='text text_type_main-large'>Соберите бургер</p>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Tab
					value='bun'
					active={currentTab === 'bun'}
					onClick={() => handleTabClick('bun')}>
					Булки
				</Tab>
				<Tab
					value='sauce'
					active={currentTab === 'sauce'}
					onClick={() => handleTabClick('sauce')}>
					Соусы
				</Tab>
				<Tab
					value='main'
					active={currentTab === 'main'}
					onClick={() => handleTabClick('main')}>
					Начинки
				</Tab>
			</div>
			<div style={{ height: '75vh', overflowY: 'auto' }}>
				<p className='text text_type_main-medium pt-10'>Булки</p>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
					{renderIngredients('bun')}
				</div>
				<p className='text text_type_main-medium pt-10'>Соусы</p>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
					{renderIngredients('sauce')}
				</div>
				<p className='text text_type_main-medium pt-10'>Начинки</p>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
					{renderIngredients('main')}
				</div>
			</div>
		</div>
	);
};
