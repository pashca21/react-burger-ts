import styles from '@pages/profile/profile.module.css';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { WS_CONNECTION_START } from '@services/actions/websocket';
import { WEBSOCKET_URL } from '@utils/constants';
import { IOrders } from '@utils/types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { FeedOrder } from '@components/feed/feed-order';

export const Orders = () => {
	const dispatch = useAppDispatch();

	const accessToken = useAppSelector((state: any) => state.auth.accessToken);

	useEffect(() => {
		const url = WEBSOCKET_URL + 'orders?token=' + accessToken;
		console.log('Connecting to WebSocket:', url);
		dispatch({
			type: WS_CONNECTION_START,
			payload: url,
		});
		return () => {
			dispatch({ type: 'WS_CONNECTION_CLOSE' });
		};
	}, [dispatch]);

	const ordersUser: IOrders = useAppSelector(
		(state: any) => state.websocket.ordersUser
	);

	if (!ordersUser) {
		return <p>Загрузка заказов...</p>;
	}

	return (
		<div className={`${styles.form}`}>
			{ordersUser?.orders.map((order) => (
				<FeedOrder key={order._id} order={order} />
			))}
		</div>
	);
};
