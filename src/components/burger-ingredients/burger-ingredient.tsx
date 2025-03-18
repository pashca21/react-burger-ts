import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';

export const BurgerIngredient = (props: {
	image: string | undefined;
	name: string;
	type: string;
	price: number;
}) => (
	<div className={styles.ingredient}>
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
);
