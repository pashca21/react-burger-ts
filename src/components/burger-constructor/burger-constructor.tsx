import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import {
	ConstructorElement,
	Button,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientProps } from '@utils/types';
import styles from './burger-constructor.module.css';
import { useModal } from '../../hooks/useModal';

export const BurgerConstructor = (props: { data: any[] }) => {
	const bunId = '643d69a5c3f7b9001cfa093c';
	const ingredientsIds = [
		'643d69a5c3f7b9001cfa0944',
		'643d69a5c3f7b9001cfa093f',
		'643d69a5c3f7b9001cfa0947',
		'643d69a5c3f7b9001cfa0946',
		'643d69a5c3f7b9001cfa0946',
	];
	const { isModalOpen, openModal, closeModal } = useModal();

	const renderTopBun = () => {
		return props.data
			.filter((ingredient: { _id: string }) => ingredient._id === bunId)
			.map((ingredient: IngredientProps) => (
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
		return props.data
			.filter((ingredient: { _id: string }) => ingredient._id === bunId)
			.map((ingredient: IngredientProps) => (
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
			const ingredient = props.data.find(
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
			<div className={`${styles.total} mt-10 mr-8 mb-10`}>
				<p className='text text_type_digits-medium'>610</p>
				<CurrencyIcon type='primary' className={'mr-10'} />
				<Button
					type='primary'
					size='large'
					htmlType={'button'}
					onClick={openModal}>
					Оформить заказ
				</Button>
			</div>
			{isModalOpen && (
				<Modal onClose={closeModal} title='Детали заказа'>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
};
