import { Key } from 'react';
import {
	ConstructorElement,
	Button,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import data from '@utils/data';

export const BurgerConstructor = () => {
	const bun_id = '60666c42cc7b410027a1a9b1';
	const ingredients_ids = [
		'60666c42cc7b410027a1a9b9',
		'60666c42cc7b410027a1a9b4',
		'60666c42cc7b410027a1a9bc',
		'60666c42cc7b410027a1a9bb',
		'60666c42cc7b410027a1a9bb',
	];

	const renderTopBun = () => {
		return data
			.filter((ingredient: { _id: string }) => ingredient._id === bun_id)
			.map(
				(ingredient: {
					_id: Key | null | undefined;
					name: string;
					type: string;
					image: string;
					price: number;
				}) => (
					<ConstructorElement
						key={ingredient._id}
						type='top'
						isLocked={true}
						text={ingredient.name + ' (верх)'}
						price={ingredient.price}
						thumbnail={ingredient.image}
						extraClass={'ml-10 mt-4 mr-4'}
					/>
				)
			);
	};

	const renderBottomBun = () => {
		return data
			.filter((ingredient: { _id: string }) => ingredient._id === bun_id)
			.map(
				(ingredient: {
					_id: Key | null | undefined;
					name: string;
					type: string;
					image: string;
					price: number;
				}) => (
					<ConstructorElement
						key={ingredient._id}
						type='bottom'
						isLocked={true}
						text={ingredient.name + ' (низ)'}
						price={ingredient.price}
						thumbnail={ingredient.image}
						extraClass={'ml-10 mt-4 mr-4'}
					/>
				)
			);
	};

	const renderIngredients = () => {
		return ingredients_ids.map((id) => {
			const ingredient = data.find(
				(ingredient: { _id: string }) => ingredient._id === id
			);
			if (!ingredient) return null;

			return (
				<div
					key={ingredient._id}
					style={{
						display: 'flex',
						justifyContent: 'start',
						alignItems: 'center',
					}}>
					<DragIcon type='primary' />
					<ConstructorElement
						text={ingredient.name}
						price={ingredient.price}
						thumbnail={ingredient.image}
						extraClass={'ml-4 mt-4 mr-4'}
					/>
				</div>
			);
		});
	};

	return (
		<div className='pl-4 pr-4'>
			<div
				className={'mt-25'}
				style={{ display: 'flex', flexDirection: 'column' }}>
				{renderTopBun()}
				<div style={{ height: '50vh', overflowY: 'auto' }}>
					{renderIngredients()}
				</div>
				{renderBottomBun()}
			</div>
			<div
				className={'mt-10 mr-8'}
				style={{
					display: 'flex',
					justifyContent: 'end',
					alignItems: 'center',
				}}>
				<p className='text text_type_digits-medium'>610</p>
				<CurrencyIcon type='primary' className={'mr-10'} />
				<Button type='primary' size='large' htmlType={'button'}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
