import {
	VIEW_INGREDIENT,
	CLOSE_INGREDIENT,
	TIngredientActions,
} from '@services/actions/ingredient';
import { ingredientReducer, ingredientInitialState } from './ingredient';
import type { IIngredient } from '@utils/types';

describe('ingredient reducer', () => {
	const ingredient: IIngredient = {
		_id: '1',
		name: 'Test Ingredient',
		type: '',
		image: '',
		image_mobile: '',
		image_large: '',
		price: 0,
		calories: 0,
		proteins: 0,
		fat: 0,
		carbohydrates: 0,
		__v: 0,
	};

	it('should return the initial state', () => {
		expect(
			ingredientReducer(undefined, {} as TIngredientActions)
		).toEqual(ingredientInitialState);
	});

	it('should handle VIEW_INGREDIENT', () => {
		expect(
			ingredientReducer(ingredientInitialState, {
				type: VIEW_INGREDIENT,
				ingredient,
			})
		).toEqual({
			...ingredientInitialState,
			ingredient,
		});
	});

	it('should handle CLOSE_INGREDIENT', () => {
		const initialState = {
			ingredient: ingredient,
		};
		expect(
			ingredientReducer(initialState, {
				type: CLOSE_INGREDIENT,
			})
		).toEqual({
			...initialState,
			ingredient: null,
		});
	});
});
