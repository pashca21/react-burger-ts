import {
	ADD_BUN,
	ADD_INGREDIENT,
	MOVE_INGREDIENT,
	REMOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
	addIngredient,
	addBun,
} from '@services/actions/constructor';
import { IIngredient } from '@interfaces/index';

const initialState = {
	bun: null,
	ingredients: [] as IIngredient[],
};

export const constructorReducer = (
	state = initialState,
	action: {
		type: string;
		ingredient: IIngredient;
		index: number;
		dragIndex?: number;
		hoverIndex?: number;
	}
) => {
	switch (action.type) {
		case ADD_BUN: {
			return {
				...state,
				bun: addBun(action.ingredient).ingredient,
			};
		}
		case ADD_INGREDIENT: {
			return {
				...state,
				ingredients: [
					...(state.ingredients || []),
					addIngredient(action.ingredient).ingredient,
				],
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
		case CLEAR_CONSTRUCTOR: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};
