import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';

export const OrderDetails = () => {
	return (
		<div className={styles.orderDetails}>
			<p className='text text_type_digits-large mb-8'>034536</p>
			<p className='text text_type_main-small mb-15'>идентификатор заказа</p>
			<CheckMarkIcon type='primary' className='mb-15' />
			<p className='text text_type_main-small mb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-small text_color_inactive mb-30'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};
