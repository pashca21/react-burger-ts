import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { useState } from 'react';
import { ModalOverlay } from '@components/modal-overlay/modaloverlay';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredientdetails';

export const BurgerIngredient = (props: {
	image: string | undefined;
	name: string;
	type: string;
	price: number;
	calories: number;
	proteins: number;
	fat: number;
	carbohydrates: number;
}) => {
	const [isModalOpen, setModalOpen] = useState(false);

	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	return (
		<>
			<div className={styles.ingredient} onClick={handleOpenModal}>
				<div className={styles.counter}>
					<Counter count={1} />
				</div>
				<img src={props.image} alt={props.name} />
				<div className={styles.price}>
					<p className='text text_type_digits-default'>{props.price}</p>
					<CurrencyIcon type={'primary'} />
				</div>
				<div>
					<p className='text text_type_main-default'>{props.name}</p>
				</div>
			</div>
			{isModalOpen && (
				<ModalOverlay onClose={handleCloseModal}>
					<Modal onClose={handleCloseModal} title='Детали ингредиента'>
						<IngredientDetails {...props} />
					</Modal>
				</ModalOverlay>
			)}
		</>
	);
};
