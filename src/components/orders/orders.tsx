import React, { useEffect } from 'react';
import {
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_START,
} from '@services/actions/websocket';
import styles from '@pages/profile/profile.module.css';
import { WEBSOCKET_URL } from '@utils/constants';
import { TRootState } from '@utils/types';
import { useAppDispatch, useAppSelector } from '@hooks';
import { FeedOrder } from '@components/feed/feed-order';

export const Orders = () => {
	const dispatch = useAppDispatch();

	const accessToken = useAppSelector(
		(state: TRootState) => state.auth.accessToken
	);

	useEffect(() => {
		const url = WEBSOCKET_URL + 'orders?token=' + accessToken;
		dispatch({
			type: WS_CONNECTION_START,
			payload: url,
		});
		return () => {
			dispatch({ type: WS_CONNECTION_CLOSED });
		};
	}, [accessToken, dispatch]);

	const { ordersUser } = useAppSelector((state: TRootState) => state.websocket);

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
