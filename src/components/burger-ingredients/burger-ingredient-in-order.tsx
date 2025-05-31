import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import stylesCommon from '../../styles/common.module.css';
import { IIngredient } from '@utils/types';

export const BurgerIngredientInOrder = (props: {
	ingredient: IIngredient;
	count: number;
}) => {
	const { ingredient, count } = props;

	return (
		<>
			<div className={stylesCommon.row_between + ' mb-4'}>
				<div className={stylesCommon.row_start}>
					<img
						className={styles.image + ' mr-4'}
						src={ingredient.image}
						alt={ingredient.name}
					/>
					<p className='text text_type_main-default'>{ingredient.name}</p>
				</div>
				<div className={styles.price}>
					<p className='text text_type_digits-default'>
						{count} x {ingredient.price}
					</p>
					<CurrencyIcon type={'primary'} />
				</div>
			</div>
		</>
	);
};
