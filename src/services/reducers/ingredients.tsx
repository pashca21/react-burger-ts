import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from '@services/actions/ingredients';
import { IngredientProps } from '@utils/types';

const initialState = {
	ingredients: [],
	loading: false,
	error: false,
};

export const ingredientsReducer = (
	state = initialState,
	action: { type: string; ingredients: IngredientProps[] }
) => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...state,
				loading: true,
			};
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
			return {
				...state,
				error: true,
				loading: false,
			};
		}
		default: {
			return state;
		}
	}
};
