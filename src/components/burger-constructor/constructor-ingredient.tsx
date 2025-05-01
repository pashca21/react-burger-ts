import { useDrag, useDrop } from 'react-dnd';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { IIngredient } from '@interfaces/index';
import { REMOVE_INGREDIENT } from '@services/actions/constructor';
import { useAppDispatch } from '@hooks/index';

export const ConstructorIngredient = ({
	ingredient,
	index,
	moveIngredient,
}: {
	ingredient: IIngredient;
	index: number;
	moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}) => {
	const dispatch = useAppDispatch();

	const removeIngredient = (index: number): void => {
		dispatch({
			type: REMOVE_INGREDIENT,
			index: index,
		});
	};

	const [, dragRef] = useDrag({
		type: 'ingredientConstructor',
		item: { index },
	});

	const [, dropRef] = useDrop({
		accept: 'ingredientConstructor',
		hover: (draggedItem: { index: number }) => {
			if (draggedItem.index !== index) {
				moveIngredient(draggedItem.index, index);
				draggedItem.index = index;
			}
		},
	});

	return (
		<div
			ref={(node) => dragRef(dropRef(node))}
			className={styles.ingredient_drag}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				extraClass={'ml-4 mt-4 mr-4'}
				handleClose={() => removeIngredient(index)}
			/>
		</div>
	);
};
