import React from 'react';
import styles from './feed-summary.module.css';
import { useAppSelector } from '@hooks';
import { IOrder, TRootState } from '@utils/types';

export const FeedSummary = () => {
	const { ordersAll } = useAppSelector((state: TRootState) => state.websocket);

	const ordersReady: IOrder[] =
		ordersAll?.orders?.filter((order: IOrder) => order.status === 'done') ?? [];

	const ordersReadyToShow: IOrder[] = Array.isArray(ordersReady)
		? ordersReady.slice(0, 20)
		: [];

	const ordersPending: IOrder[] =
		ordersAll?.orders?.filter((order: IOrder) => order.status === 'pending') ??
		[];

	const ordersPendingToShow: IOrder[] = Array.isArray(ordersPending)
		? ordersPending.slice(0, 20)
		: [];

	return (
		<div className={`${styles.form}`}>
			<div className={`${styles.row} mb-10`}>
				<div className={`${styles.section}`}>
					<p className='text text_type_main-default'>Готовы:</p>
					<div className={`${styles.two_columns} mb-6`}>
						{ordersReadyToShow.map((order) => (
							<p key={order._id} className='text text_type_digits-default'>
								{order.number}
							</p>
						))}
					</div>
				</div>
				<div className={`${styles.section}`}>
					<p className='text text_type_main-default'>В работе:</p>
					<div className={`${styles.two_columns} mb-6`}>
						{ordersPendingToShow.map((order) => (
							<p key={order._id} className='text text_type_digits-default'>
								{order.number}
							</p>
						))}
					</div>
				</div>
			</div>
			<div className={'mb-10'}>
				<p className='text text_type_main-default'>Выполнено за все время:</p>
				<p className='text text_type_digits-large'>{ordersAll?.total ?? 0}</p>
			</div>
			<div className={'mb-10'}>
				<p className='text text_type_main-default'>Выполнено за сегодня:</p>
				<p className='text text_type_digits-large'>
					{ordersAll?.totalToday ?? 0}
				</p>
			</div>
		</div>
	);
};
