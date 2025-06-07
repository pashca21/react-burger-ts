import {
	VIEW_INGREDIENT,
	CLOSE_INGREDIENT,
} from '@services/actions/ingredient';
import type { IIngredient } from '@utils/types';
import type { TIngredientActions } from '@services/actions/ingredient';

export type TIngredientState = {
	ingredient: IIngredient | null;
};

export const ingredientInitialState: TIngredientState = {
	ingredient: null,
};

export const ingredientReducer = (
	state: TIngredientState = ingredientInitialState,
	action: TIngredientActions
): TIngredientState => {
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
