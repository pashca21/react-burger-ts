import { ReactNode, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { IIngredient } from '@interfaces/index';
import {
	CLOSE_INGREDIENT,
	VIEW_INGREDIENT,
} from '@services/actions/ingredient';
import { useDrag } from 'react-dnd';
import { useAppDispatch, useAppSelector, useModal } from '@hooks/index';

export const BurgerIngredient = (props: {
	ingredient: IIngredient;
}): ReactNode => {
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
		(state: any) => state.constructor.ingredients
	);

	let constructorIngredient_a = [];

	if (constructorIngredients) {
		constructorIngredient_a = constructorIngredients.filter(
			(ingredient: IIngredient) => ingredient._id === props.ingredient._id
		);
	}

	const count = constructorIngredient_a.length;

	const handleIngredientClick = (): void => {
		dispatch({ type: VIEW_INGREDIENT, ingredient: props.ingredient });
		openModal();
		window.history.pushState(
			{ fromHome: true },
			'',
			'/ingredients/' + props.ingredient._id
		);
	};

	const handleIngredientClose = (): void => {
		closeModal();
		dispatch({ type: CLOSE_INGREDIENT });
		window.history.pushState({}, '', '/');
	};

	useEffect(() => {
		if (searchParams.get('openModalIngredientId') === props.ingredient._id) {
			handleIngredientClick();
		}
	}, [searchParams, props.ingredient._id]);

	return (
		<>
			<div
				className={styles.ingredient}
				onClick={handleIngredientClick}
				onKeyDown={handleIngredientClick}
				role='presentation'>
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
