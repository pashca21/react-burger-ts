import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { useModal } from '../../hooks/useModal';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { IngredientProps } from '@utils/types';

export const BurgerIngredient = (props: { ingredient: IngredientProps }) => {
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<>
			<div className={styles.ingredient} onClick={openModal}>
				<div className={styles.counter}>
					<Counter count={1} />
				</div>
				<img src={props.ingredient.image} alt={props.ingredient.name} />
				<div className={styles.price}>
					<p className='text text_type_digits-default'>{props.ingredient.price}</p>
					<CurrencyIcon type={'primary'} />
				</div>
				<div>
					<p className='text text_type_main-default'>{props.ingredient.name}</p>
				</div>
			</div>
			{isModalOpen && (
				<Modal onClose={closeModal} title='Детали ингредиента'>
					<IngredientDetails ingredient={props.ingredient} />
				</Modal>
			)}
		</>
	);
};
