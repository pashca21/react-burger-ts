import React, { useEffect } from 'react';
import styles from '../auth/login.module.css';
import { VIEW_INGREDIENT } from '@services/actions/ingredient';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { IIngredient } from '@utils/types';
import { FeedOrder } from '@components/feed/feed-order';
import { WS_CONNECTION_START } from '@services/actions/websocket';
import { WEBSOCKET_URL } from '@utils/constants';

export const OrderPage = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const { id } = useParams();

	const order = useAppSelector((state: any) => state.feedOrder.order);

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

	const {
		loading: loadingIngredients,
		error: errorIngredients,
		ingredients,
	} = useAppSelector((state: any) => state.ingredients);

	useEffect(() => {
		if (performance.navigation.type === 1) {
			navigate('/?openModalOrderId=' + id);
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
		return <p>Загрузка...</p>;
	}

	if (errorIngredients) {
		return <p>Ошибка загрузки ингредиентов: {errorIngredients}</p>;
	}

	if (!order) {
		return <p>Заказ не найден</p>;
	}

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.form}`}>
				<h1 className={'mb-6 text text_type_main-large'}>
					Информация о заказе
				</h1>
				<FeedOrder order={order} />
			</div>
		</div>
	);
};
