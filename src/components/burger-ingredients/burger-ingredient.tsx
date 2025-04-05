import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { useModal } from '../../hooks/useModal';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { IngredientProps } from '@utils/types';
import {
	CLOSE_INGREDIENT,
	VIEW_INGREDIENT,
} from '@services/actions/ingredient';
import { useDrag } from 'react-dnd';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

export const BurgerIngredient = (props: { ingredient: IngredientProps }) => {
	const dispatch = useAppDispatch();

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
			(ingredient: IngredientProps) => ingredient._id === props.ingredient._id
		);
	}

	const count = constructorIngredient_a.length;

	const handleIngredientClick = () => {
		dispatch({ type: VIEW_INGREDIENT, ingredient: props.ingredient });
		openModal();
	};

	const handleIngredientClose = () => {
		closeModal();
		dispatch({ type: CLOSE_INGREDIENT });
	};

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
					<p className='text text_type_digits-default'>{props.ingredient.price}</p>
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
