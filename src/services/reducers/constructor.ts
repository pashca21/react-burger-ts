import {
	ADD_BUN,
	ADD_INGREDIENT,
	MOVE_INGREDIENT,
	REMOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
	addIngredient,
	addBun,
	TConstructorActions,
} from '@services/actions/constructor';
import { IIngredient } from '@utils/types';

export type TConstructorState = {
	bun: IIngredient | null;
	ingredients: ReadonlyArray<IIngredient>;
};

export const constructorInitialState: TConstructorState = {
	bun: null,
	ingredients: [] as IIngredient[],
};

export const constructorReducer = (
	state: TConstructorState = constructorInitialState,
	action: TConstructorActions
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
			const [movedIngredient] = newIngredients.splice(action?.dragIndex, 1);
			newIngredients.splice(action?.hoverIndex, 0, movedIngredient);
			return {
				...state,
				ingredients: newIngredients,
			};
		}
		case CLEAR_CONSTRUCTOR: {
			return constructorInitialState;
		}
		default: {
			return state;
		}
	}
};
