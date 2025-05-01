import { IIngredient } from '@interfaces/index';
import { v4 as uuid } from 'uuid';

export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addBun = (ingredient: IIngredient) => {
	return {
		type: ADD_BUN,
		ingredient: { ...ingredient, uniqueId: uuid() },
	};
};

export const addIngredient = (ingredient: IIngredient) => {
	return {
		type: ADD_INGREDIENT,
		ingredient: { ...ingredient, uniqueId: uuid() },
	};
};
