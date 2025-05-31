import { createOrderRequest } from '../api';
import { CLEAR_CONSTRUCTOR } from '@services/actions/constructor';

export const VIEW_ORDER = 'VIEW_ORDER' as const;
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST' as const;
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS' as const;
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED' as const;
export const CLEAR_ORDER = 'CLEAR_ORDER' as const;

export const createOrder = (ingredients_ids: string[], accessToken: string) => {
	return function (dispatch: any) {
		dispatch({
			type: CREATE_ORDER_REQUEST,
		});
		createOrderRequest(ingredients_ids, accessToken)
			.then((res) => {
				if (res.success) {
					dispatch({
						type: CREATE_ORDER_SUCCESS,
						name: res.data.name,
						number: res.data.order.number,
					});
				} else {
					dispatch({
						type: CREATE_ORDER_FAILED,
					});
				}
			})
			.then(() => {
				dispatch({
					type: CLEAR_CONSTRUCTOR,
				});
			})
			.catch((err) => {
				dispatch({
					type: CREATE_ORDER_FAILED,
					message: err.message,
				});
			});
	};
};
