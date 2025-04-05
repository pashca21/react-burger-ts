import { getIngredientsRequest } from '../api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
	return function (dispatch: any) {
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
				console.error(err);
				dispatch({
					type: GET_INGREDIENTS_FAILED,
					message: err.message,
				});
			});
	};
}
