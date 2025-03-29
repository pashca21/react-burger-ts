import styles from './ingredient-details.module.css';
import { IngredientProps } from '@utils/types';

export const IngredientDetails = (props: { ingredient: IngredientProps }) => {
	return (
		<div className={styles.ingredientDetails}>
			<img
				src={props.ingredient.image_large}
				alt={props.ingredient.name}
				className='mb-4'
			/>
			<div className='mb-8'>
				<p className='text text_type_main-medium'>{props.ingredient.name}</p>
			</div>
			<div className={styles.ingredientContent + ' mb-15'}>
				<div className='mr-5'>
					<p className='text text_type_main-default text_color_inactive'>
						Калории, ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{props.ingredient.calories}
					</p>
				</div>
				<div className='mr-5'>
					<p className='text text_type_main-default text_color_inactive'>
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{props.ingredient.proteins}
					</p>
				</div>
				<div className='mr-5'>
					<p className='text text_type_main-default text_color_inactive'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{props.ingredient.fat}
					</p>
				</div>
				<div>
					<p className='text text_type_main-default text_color_inactive'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{props.ingredient.carbohydrates}
					</p>
				</div>
			</div>
		</div>
	);
};
