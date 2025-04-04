import { createOrderRequest } from '../api';

export const VIEW_ORDER = 'VIEW_ORDER';
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const createOrder = (ingredients_ids: string[]) => {
	return function (dispatch: any) {
		dispatch({
			type: CREATE_ORDER_REQUEST,
		});
		createOrderRequest(ingredients_ids)
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
			.catch((err) => {
				console.error(err);
				dispatch({
					type: CREATE_ORDER_FAILED,
					message: err.message,
				});
			});
	};
};
