import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerIngredient = (props: {
	image: string | undefined;
	name: string;
	type: string;
	price: number;
}) => (
	<div
		style={{
			display: 'flex',
			textAlign: 'center',
			flexDirection: 'column',
			alignItems: 'center',
			position: 'relative',
			width: '45%',
		}}>
		<div style={{ position: 'absolute', top: 0, right: 0 }}>
			<Counter count={1} />
		</div>
		<img src={props.image} alt={props.name} style={{ margin: '10px 0' }} />
		<div style={{ display: 'flex' }}>
			<p className='text text_type_digits-default'>{props.price}</p>
			<CurrencyIcon type={'primary'} />
		</div>
		<div>
			<p className='text text_type_main-default'>{props.name}</p>
		</div>
	</div>
);
