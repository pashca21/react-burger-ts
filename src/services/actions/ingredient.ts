import type { IIngredient } from '@utils/types';

export const VIEW_INGREDIENT = 'VIEW_INGREDIENT' as const;
export const CLOSE_INGREDIENT = 'CLOSE_INGREDIENT' as const;

export interface IViewIngredientAction {
	readonly type: typeof VIEW_INGREDIENT;
	readonly ingredient: IIngredient;
}

export interface ICloseIngredientAction {
	readonly type: typeof CLOSE_INGREDIENT;
}

export type TIngredientActions = IViewIngredientAction | ICloseIngredientAction;
