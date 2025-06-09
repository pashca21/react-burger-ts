import { useEffect } from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';
import { useAppDispatch, useAppSelector } from '@hooks';
import { CLEAR_ORDER } from '@services/actions/order';
import { TRootState } from '@utils/types';

export const OrderDetails = () => {
	const order = useAppSelector((state: TRootState) => state.order);
	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			dispatch({ type: CLEAR_ORDER });
		};
	}, [dispatch]);

	return (
		<div className={styles.orderDetails}>
			{order.number ? (
				<>
					<p className='text text_type_digits-large mb-8'>{order.number}</p>
					<p className='text text_type_main-small mb-15'>
						идентификатор заказа
					</p>
					<CheckMarkIcon type='primary' className='mb-15' />
					<p className='text text_type_main-small mb-2'>
						Ваш заказ начали готовить
					</p>
					<p className='text text_type_main-small text_color_inactive mb-30'>
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			) : (
				<p className='text'>Создаем ваш заказ...</p>
			)}
		</div>
	);
};
