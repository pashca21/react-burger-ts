import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

export const IngredientDetails = () => {
	const ingredient = useSelector((state: any) => state.ingredient.ingredient);

	return (
		<div className={styles.ingredientDetails}>
			<img
				src={ingredient.image_large}
				alt={ingredient.name}
				className='mb-4'
			/>
			<div className='mb-8'>
				<p className='text text_type_main-medium'>{ingredient.name}</p>
			</div>
			<div className={styles.ingredientContent + ' mb-15'}>
				<div className='mr-5'>
					<p className='text text_type_main-default text_color_inactive'>
						Калории, ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.calories}
					</p>
				</div>
				<div className='mr-5'>
					<p className='text text_type_main-default text_color_inactive'>
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.proteins}
					</p>
				</div>
				<div className='mr-5'>
					<p className='text text_type_main-default text_color_inactive'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.fat}
					</p>
				</div>
				<div>
					<p className='text text_type_main-default text_color_inactive'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.carbohydrates}
					</p>
				</div>
			</div>
		</div>
	);
};
