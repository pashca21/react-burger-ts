import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient, TRootState } from '@utils/types';
import styles from './burger-constructor.module.css';
import { useAppDispatch, useAppSelector, useModal } from '@hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import {
	ADD_BUN,
	ADD_INGREDIENT,
	MOVE_INGREDIENT,
} from '@services/actions/constructor';
import { createOrder, VIEW_ORDER } from '@services/actions/order';
import { ConstructorBunTop } from '@components/burger-constructor/constructor-bun-top';
import { ConstructorBunBottom } from '@components/burger-constructor/constructor-bun-bottom';
import { ConstructorIngredient } from '@components/burger-constructor/constructor-ingredient';

export const BurgerConstructor = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuth, accessToken } = useAppSelector(
		(state: TRootState) => state.auth
	);
	const { isModalOpen, openModal, closeModal } = useModal();

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(ingredient: IIngredient) {
			if (ingredient.type === 'bun') {
				dispatch({
					type: ADD_BUN,
					ingredient: { ...ingredient, uniqueId: '' },
				});
			} else {
				dispatch({
					type: ADD_INGREDIENT,
					ingredient: { ...ingredient, uniqueId: '' },
				});
			}
		},
	});

	const moveIngredient = (dragIndex: number, hoverIndex: number) => {
		dispatch({
			type: MOVE_INGREDIENT,
			dragIndex: dragIndex,
			hoverIndex: hoverIndex,
		});
	};

	const { bun: constructorBun, ingredients: constructorIngredients } =
		useAppSelector((state: TRootState) => state.constructor);

	let totalPrice = 0;
	if (constructorBun) {
		totalPrice += constructorBun.price * 2;
	}
	if (constructorIngredients) {
		totalPrice += constructorIngredients.reduce(
			(acc: number, ingredient: IIngredient) => {
				return acc + ingredient.price;
			},
			0
		);
	}

	const handleCreateOrder = () => {
		if (!isAuth) {
			navigate('/login', { state: { from: location } });
		}
		const ingredientsIds = constructorIngredients
			.map((ingredient: IIngredient) => ingredient._id)
			.filter((id): id is string => !!id);
		if (constructorBun && constructorBun._id) {
			ingredientsIds.unshift(constructorBun._id);
		}
		if (accessToken) {
			dispatch<any>(createOrder(ingredientsIds, accessToken));
		}
		dispatch({
			type: VIEW_ORDER,
			number: 0,
			order: {
				_id: '',
				name: '',
				status: '',
				number: 0,
				createdAt: '',
				updatedAt: '',
				ingredients: [],
			},
		});
		openModal();
	};

	const renderIngredients = () => {
		if (!constructorIngredients) {
			return null;
		}
		return constructorIngredients.map(
			(ingredient: IIngredient, index: number) => {
				return (
					<ConstructorIngredient
						key={ingredient.uniqueId}
						ingredient={ingredient}
						index={index}
						moveIngredient={moveIngredient}></ConstructorIngredient>
				);
			}
		);
	};

	return (
		<div className='pl-4 pr-4'>
			<div ref={dropTarget} className={`${styles.ingredients} mt-25`}>
				<ConstructorBunTop />
				<div className={styles.ingredient_middle}>{renderIngredients()}</div>
				<ConstructorBunBottom />
			</div>
			<div className={`${styles.total} mt-10 mr-8 mb-10`}>
				<p className='text text_type_digits-medium'>{totalPrice}</p>
				<CurrencyIcon type='primary' className={'mr-10'} />
				{constructorBun &&
					constructorIngredients &&
					constructorIngredients.length > 0 && (
						<Button
							type='primary'
							size='large'
							htmlType={'button'}
							onClick={handleCreateOrder}>
							Оформить заказ
						</Button>
					)}
			</div>
			{isModalOpen && (
				<Modal onClose={closeModal} title='Детали заказа'>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
};
