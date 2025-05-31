import React, { useEffect } from 'react';
import styles from './feed.module.css';
import { FeedOrder } from '@components/feed/feed-order';
import { IOrders } from '@utils/types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { WS_CONNECTION_START } from '@services/actions/websocket';
import { WEBSOCKET_URL } from '@utils/constants';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { FeedSummary } from '@components/feed/feed-summary';
import { useLocation } from 'react-router-dom';

export const FeedPage = () => {
	const dispatch = useAppDispatch();

	const location = useLocation();

	useEffect(() => {
		return () => {
			dispatch({ type: 'WS_CONNECTION_CLOSE' });
		};
	}, [location.pathname, dispatch]);

	useEffect(() => {
		dispatch({
			type: WS_CONNECTION_START,
			payload: WEBSOCKET_URL + 'orders/all',
		});
	}, [dispatch]);

	const ordersAll: IOrders = useAppSelector(
		(state: any) => state.websocket.ordersAll
	);

	return (
		<div>
			<h1 className='text text_type_main-large'>Лента заказов</h1>
			<div className={`${styles.container}`}>
				<section
					className={
						styles.section +
						' mr-15 ' +
						styles.form +
						' ' +
						styles.scroll_section
					}>
					{ordersAll?.orders.map((order) => (
						<FeedOrder key={order._id} order={order} />
					))}
				</section>
				<section className={styles.section}>
					<FeedSummary />
				</section>
			</div>
		</div>
	);
};
