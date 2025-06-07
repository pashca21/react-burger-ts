import { getIngredientsRequest } from '../api';
import { AppThunk, IIngredient } from '@utils/types';
import { AppDispatch } from '../../index';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST' as const;
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS' as const;
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED' as const;

export interface IGetIngredientsRequestAction {
	readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
	readonly ingredients: IIngredient[];
}

export interface IGetIngredientsFailedAction {
	readonly type: typeof GET_INGREDIENTS_FAILED;
	readonly message?: string;
}

export type TIngredientsActions =
	| IGetIngredientsRequestAction
	| IGetIngredientsSuccessAction
	| IGetIngredientsFailedAction;

export const getIngredients = (): AppThunk => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: GET_INGREDIENTS_REQUEST,
		});
		getIngredientsRequest()
			.then((res) => {
				if (res.success) {
					dispatch({
						type: GET_INGREDIENTS_SUCCESS,
						ingredients: res.ingredients,
					});
				} else {
					dispatch({
						type: GET_INGREDIENTS_FAILED,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: GET_INGREDIENTS_FAILED,
					message: err.message,
				});
			});
	};
};
