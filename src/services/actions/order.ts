import { createOrderRequest } from '../api';
import { CLEAR_CONSTRUCTOR } from '@services/actions/constructor';
import { AppDispatch } from '../../index';
import { AppThunk, IOrder } from '@utils/types';

export const VIEW_ORDER = 'VIEW_ORDER' as const;
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST' as const;
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS' as const;
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED' as const;
export const CLEAR_ORDER = 'CLEAR_ORDER' as const;

export interface IViewOrderAction {
	readonly type: typeof VIEW_ORDER;
	readonly number: number;
	order: IOrder;
}

export interface ICreateOrderRequestAction {
	readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
	readonly type: typeof CREATE_ORDER_SUCCESS;
	readonly name: string;
	readonly number: number;
}

export interface ICreateOrderFailedAction {
	readonly type: typeof CREATE_ORDER_FAILED;
	readonly message?: string;
}

export interface IClearOrderAction {
	readonly type: typeof CLEAR_ORDER;
}

export type TOrderActions =
	| IViewOrderAction
	| ICreateOrderRequestAction
	| ICreateOrderSuccessAction
	| ICreateOrderFailedAction
	| IClearOrderAction;

export const createOrder = (
	ingredients_ids: string[],
	accessToken: string
): AppThunk => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: CREATE_ORDER_REQUEST,
		});
		createOrderRequest(ingredients_ids, accessToken)
			.then((res) => {
				if (res.success) {
					dispatch({
						type: CREATE_ORDER_SUCCESS,
						name: res.data?.name,
						number: res.data?.order.number,
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
			.catch((err: Error) => {
				dispatch({
					type: CREATE_ORDER_FAILED,
					message: err.message,
				});
			});
	};
};
