import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './feed.module.css';
import { FeedOrder } from '@components/feed/feed-order';
import { IOrders, TRootState } from '@utils/types';
import {
	WS_CONNECTION_START,
	WS_CONNECTION_CLOSED,
} from '@services/actions/websocket';
import { WEBSOCKET_URL } from '@utils/constants';
import { useAppDispatch, useAppSelector } from '@hooks';
import { FeedSummary } from '@components/feed/feed-summary';

export const FeedPage = () => {
	const dispatch = useAppDispatch();

	const location = useLocation();

	useEffect(() => {
		return () => {
			dispatch({ type: WS_CONNECTION_CLOSED });
		};
	}, [location.pathname, dispatch]);

	useEffect(() => {
		dispatch({
			type: WS_CONNECTION_START,
			payload: WEBSOCKET_URL + 'orders/all',
		});
	}, [dispatch]);

	const ordersAll: IOrders | undefined = useAppSelector(
		(state: TRootState) => state.websocket.ordersAll
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
