import {
	VIEW_INGREDIENT,
	CLOSE_INGREDIENT,
} from '@services/actions/ingredient';
import { IngredientProps } from '@utils/types';

const initialState = {
	ingredient: null,
};

export const ingredientReducer = (
	state = initialState,
	action: { type: string; ingredient: IngredientProps }
) => {
	switch (action.type) {
		case VIEW_INGREDIENT: {
			return {
				...state,
				ingredient: action.ingredient,
			};
		}
		case CLOSE_INGREDIENT: {
			return {
				...state,
				ingredient: null,
			};
		}
		default: {
			return state;
		}
	}
};
