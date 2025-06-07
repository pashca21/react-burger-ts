import React, { useEffect } from 'react';
import styles from '../auth/login.module.css';
import { VIEW_INGREDIENT } from '@services/actions/ingredient';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { IIngredient, TRootState } from '@utils/types';
import {
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_START,
} from '@services/actions/websocket';
import { WEBSOCKET_URL } from '@utils/constants';
import { getOrderRequest } from '@services/api';
import { VIEW_FEED_ORDER } from '@services/actions/feed-order';
import { FeedOrderDetails } from '@components/feed-order/feed-order';

export const OrderPage = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const { id } = useParams();

	const order = useAppSelector((state: TRootState) => state.feedOrder.order);

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

	const {
		loading: loadingIngredients,
		error: errorIngredients,
		ingredients,
	} = useAppSelector((state: TRootState) => state.ingredients);

	useEffect(() => {
		if (performance.navigation.type === 1) {
			navigate('/feed/?openModalOrderId=' + id);
		}
	}, [dispatch, id, navigate]);

	useEffect(() => {
		const ingredient = ingredients.find(
			(ingredient: IIngredient) => ingredient._id === id
		);
		if (ingredient) {
			dispatch({ type: VIEW_INGREDIENT, ingredient: ingredient });
		}
	}, [dispatch, id, order, ingredients]);

	if (loadingIngredients) {
		return <p className={'text text_type_main-medium'}>Загрузка...</p>;
	}

	if (errorIngredients) {
		return (
			<p className={'text text_type_main-medium'}>
				Ошибка загрузки ингредиентов: {errorIngredients}
			</p>
		);
	}

	if (!order && id) {
		getOrderRequest(id).then((res) => {
			if (res.success) {
				dispatch({ type: VIEW_FEED_ORDER, order: res.data.orders[0] });
			}
		});
	}

	if (!order) {
		return <p className={'text text_type_main-medium'}>Заказ не найден</p>;
	}

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.form}`}>
				<h1 className={'mb-6 text text_type_main-large'}>
					Информация о заказе
				</h1>
				<FeedOrderDetails order={order} />
			</div>
		</div>
	);
};
