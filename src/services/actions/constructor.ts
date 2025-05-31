import { IIngredient } from '@utils/types';
import { v4 as uuid } from 'uuid';

export const ADD_BUN = 'ADD_BUN' as const;
export const ADD_INGREDIENT = 'ADD_INGREDIENT' as const;
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT' as const;
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT' as const;
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR' as const;

export interface IAddBunAction {
	readonly type: typeof ADD_BUN;
	readonly ingredient: IIngredient & { uniqueId: string };
}

export interface IAddIngredientAction {
	readonly type: typeof ADD_INGREDIENT;
	readonly ingredient: IIngredient & { uniqueId: string };
}

export const addBun = (ingredient: IIngredient): IAddBunAction => {
	return {
		type: ADD_BUN,
		ingredient: { ...ingredient, uniqueId: uuid() },
	};
};

export const addIngredient = (
	ingredient: IIngredient
): IAddIngredientAction => {
	return {
		type: ADD_INGREDIENT,
		ingredient: { ...ingredient, uniqueId: uuid() },
	};
};
