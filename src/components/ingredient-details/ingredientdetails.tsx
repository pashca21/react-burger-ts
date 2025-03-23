import styles from './ingredientdetails.module.css';

export const IngredientDetails = (props: {
	image: string | undefined;
	name: string;
	calories: number;
	proteins: number;
	fat: number;
	carbohydrates: number;
}) => {
	return (
		<div className={styles.ingredientDetails}>
			<img src={props.image} alt={props.name} className='mb-4' />
			<div className='mb-8'>
				<p className='text text_type_main-medium'>{props.name}</p>
			</div>
			<div className={styles.ingredientContent + ' mb-15'}>
				<div className='mr-5'>
					<p className='text text_type_main-default text_color_inactive'>
						Калории, ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{props.calories}
					</p>
				</div>
				<div className='mr-5'>
					<p className='text text_type_main-default text_color_inactive'>
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{props.proteins}
					</p>
				</div>
				<div className='mr-5'>
					<p className='text text_type_main-default text_color_inactive'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{props.fat}
					</p>
				</div>
				<div>
					<p className='text text_type_main-default text_color_inactive'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{props.carbohydrates}
					</p>
				</div>
			</div>
		</div>
	);
};
