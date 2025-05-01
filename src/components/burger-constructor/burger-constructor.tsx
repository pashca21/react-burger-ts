import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '@interfaces/index';
import styles from './burger-constructor.module.css';
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
import { useAppDispatch, useAppSelector, useModal } from '@hooks/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { Key } from 'react';

export const BurgerConstructor = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuth } = useAppSelector((state: any) => state.auth);
	const { isModalOpen, openModal, closeModal } = useModal();

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(ingredient: IIngredient) {
			if (ingredient.type === 'bun') {
				dispatch({
					type: ADD_BUN,
					ingredient: ingredient,
				});
			} else {
				dispatch({
					type: ADD_INGREDIENT,
					ingredient: ingredient,
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

	const constructorBun: IIngredient = useAppSelector(
		(state: any) => state.constructor.bun
	);

	const constructorIngredients: IIngredient[] = useAppSelector(
		(state: any) => state.constructor.ingredients
	);

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
			return;
		}

		const ingredientsIds: (string | number | bigint | null | undefined)[] =
			constructorIngredients.map(
				(ingredient: IIngredient): Key | null | undefined => ingredient._id
			);

		if (constructorBun) {
			ingredientsIds.unshift(constructorBun._id);
		}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dispatch<any>(createOrder(ingredientsIds));

		dispatch({ type: VIEW_ORDER });
		openModal();
	};

	const renderIngredients = () => {
		if (!constructorIngredients) return null;
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
