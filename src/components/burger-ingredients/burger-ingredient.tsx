import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { IIngredient, TRootState } from '@utils/types';
import {
	CLOSE_INGREDIENT,
	VIEW_INGREDIENT,
} from '@services/actions/ingredient';
import { useAppDispatch, useAppSelector, useModal } from '@hooks';

export const BurgerIngredient = (props: { ingredient: IIngredient }) => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	const { isModalOpen, openModal, closeModal } = useModal();

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: props.ingredient,
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
	});

	const constructorIngredients = useAppSelector(
		(state: TRootState) => state.constructor.ingredients
	);

	let constructorIngredient_a = [];

	if (constructorIngredients) {
		constructorIngredient_a = constructorIngredients.filter(
			(ingredient: IIngredient) => ingredient._id === props.ingredient._id
		);
	}

	const count = constructorIngredient_a.length;

	const handleIngredientClick = () => {
		dispatch({ type: VIEW_INGREDIENT, ingredient: props.ingredient });
		openModal();
		window.history.pushState(
			{ fromHome: true },
			'',
			'/ingredients/' + props.ingredient._id
		);
	};

	const handleIngredientClose = () => {
		closeModal();
		dispatch({ type: CLOSE_INGREDIENT });
		window.history.pushState({}, '', '/');
	};

	useEffect(() => {
		if (searchParams.get('openModalIngredientId') === props.ingredient._id) {
			handleIngredientClick();
		}
	}, [searchParams, props.ingredient._id, handleIngredientClick]);

	return (
		<>
			<div className={styles.ingredient} onClick={handleIngredientClick}>
				{count > 0 && (
					<div className={styles.counter}>
						<Counter count={count} />
					</div>
				)}
				<img
					ref={dragRef}
					src={props.ingredient.image}
					alt={props.ingredient.name}
				/>
				<div className={styles.price}>
					<p className='text text_type_digits-default'>
						{props.ingredient.price}
					</p>
					<CurrencyIcon type={'primary'} />
				</div>
				<div>
					<p className='text text_type_main-default'>{props.ingredient.name}</p>
				</div>
			</div>
			{isModalOpen && (
				<Modal onClose={handleIngredientClose} title='Детали ингредиента'>
					<IngredientDetails />
				</Modal>
			)}
		</>
	);
};
