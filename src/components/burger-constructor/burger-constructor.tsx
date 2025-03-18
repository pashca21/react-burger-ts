import {
	ConstructorElement,
	Button,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import data from '@utils/data';
import { Ingredient } from '@utils/types';
import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
	const bunId = '60666c42cc7b410027a1a9b1';
	const ingredientsIds = [
		'60666c42cc7b410027a1a9b9',
		'60666c42cc7b410027a1a9b4',
		'60666c42cc7b410027a1a9bc',
		'60666c42cc7b410027a1a9bb',
		'60666c42cc7b410027a1a9bb',
	];

	const renderTopBun = () => {
		return data
			.filter((ingredient: { _id: string }) => ingredient._id === bunId)
			.map((ingredient: Ingredient) => (
				<ConstructorElement
					key={ingredient._id + '_top'}
					type='top'
					isLocked={true}
					text={ingredient.name + ' (верх)'}
					price={ingredient.price}
					thumbnail={ingredient.image}
					extraClass={'ml-10 mt-4 mr-4'}
				/>
			));
	};

	const renderBottomBun = () => {
		return data
			.filter((ingredient: { _id: string }) => ingredient._id === bunId)
			.map((ingredient: Ingredient) => (
				<ConstructorElement
					key={ingredient._id + '_bottom'}
					type='bottom'
					isLocked={true}
					text={ingredient.name + ' (низ)'}
					price={ingredient.price}
					thumbnail={ingredient.image}
					extraClass={'ml-10 mt-4 mr-4'}
				/>
			));
	};

	const renderIngredients = () => {
		return ingredientsIds.map((id, index) => {
			const ingredient = data.find(
				(ingredient: { _id: string }) => ingredient._id === id
			);
			if (!ingredient) return null;

			return (
				<div
					key={ingredient._id + '_' + index}
					className={styles.ingredient_drag}>
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
			<div className={`${styles.ingredients} mt-25`}>
				{renderTopBun()}
				<div className={styles.ingredient_middle}>{renderIngredients()}</div>
				{renderBottomBun()}
			</div>
			<div className={`${styles.total} mt-10 mr-8`}>
				<p className='text text_type_digits-medium'>610</p>
				<CurrencyIcon type='primary' className={'mr-10'} />
				<Button type='primary' size='large' htmlType={'button'}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
