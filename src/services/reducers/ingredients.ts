import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from '@services/actions/ingredients';
import type { IIngredient } from '@utils/types';
import type { TIngredientsActions } from '@services/actions/ingredients';

export type TIngredientsState = {
	ingredients: Array<IIngredient>;
	loading: boolean;
	error: boolean;
};

export const ingredientsInitialState: TIngredientsState = {
	ingredients: [],
	loading: false,
	error: false,
};

export const ingredientsReducer = (
	state: TIngredientsState = ingredientsInitialState,
	action: TIngredientsActions
): TIngredientsState => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return { ...state, loading: true };
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				...state,
				ingredients: action.ingredients,
				loading: false,
				error: false,
			};
		}
		case GET_INGREDIENTS_FAILED: {
			return { ...state, error: true, loading: false };
		}
		default: {
			return state;
		}
	}
};
