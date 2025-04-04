import {
	ADD_BUN,
	ADD_INGREDIENT,
	MOVE_INGREDIENT,
	REMOVE_INGREDIENT,
} from '@services/actions/constructor';
import { IngredientProps } from '@utils/types';

const initialState = {
	bun: null,
	ingredients: [] as IngredientProps[],
};

export const constructorReducer = (
	state = initialState,
	action: {
		type: string;
		ingredient: IngredientProps;
		index: number;
		dragIndex?: number;
		hoverIndex?: number;
	}
) => {
	switch (action.type) {
		case ADD_BUN: {
			return {
				...state,
				bun: action.ingredient,
			};
		}
		case ADD_INGREDIENT: {
			return {
				...state,
				ingredients: [...(state.ingredients || []), action.ingredient],
			};
		}
		case REMOVE_INGREDIENT: {
			return {
				...state,
				ingredients: state.ingredients.filter(
					(_, index) => index !== action.index
				),
			};
		}
		case MOVE_INGREDIENT: {
			const newIngredients = [...state.ingredients];
			const [movedIngredient] = newIngredients.splice(action.dragIndex!, 1);
			newIngredients.splice(action.hoverIndex!, 0, movedIngredient);
			return {
				...state,
				ingredients: newIngredients,
			};
		}
		default: {
			return state;
		}
	}
};
